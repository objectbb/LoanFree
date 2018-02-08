import React, { Component } from "react"
import classnames from "classnames"
import { connect } from "react-redux"
import moment from 'moment'
import geolib from "geolib"
import Icon from 'material-ui/Icon'

import { Map, Marker, TileLayer, Popup, Tooltip } from 'react-leaflet'
import { divIcon, point } from "leaflet"
import CaptureMoments from "./CaptureMoments"
import FullScreenDialog from "./components/FullScreenDialog"

import "./styles/app.css"

class MapIt extends Component {

    constructor(props) {
        super(props);

        this.state = { isCamera: false }

        this.updatePosition = this.updatePosition.bind(this);
        this.removeMarker = this.removeMarker.bind(this);
        this.closeIndicator = this.closeIndicator.bind(this);
        this.handleCamera = this.handleCamera.bind(this)
        this.handleClose = this.handleClose.bind(this)
    }

    closeIndicator(coords) {

        return this.props.routeMarkers && this.props.routeMarkers.some((marker) => {
            let distance = geolib.getDistance({ latitude: coords[0], longitude: coords[1] }, { latitude: marker.coords[0], longitude: marker.coords[1] })
            return distance < marker.range
        });
    }

    withinRangeMarkerIndicator(prt) {

        return this.props.routeMarkers &&
            this.props.routeMarkers.map((marker) => {
                let distance = geolib.getDistance({
                    latitude: prt.coords[0],
                    longitude: prt.coords[1]
                }, { latitude: marker.coords[0], longitude: marker.coords[1] })
                if (distance < marker.range) {
                    return Object.assign({}, { details: { range: distance, coords: prt.coords } }, { marker })
                }
            }).filter((item) => item);
    }

    updatePosition(e) {

        let item = e.target.options.name;

        item.coords = [e.target._latlng.lat, e.target._latlng.lng]

        this.props.updatePosition(item);
    }

    removeMarker(item, e) {
        e.preventDefault()
        this.props.removeMarker(item);
    }

    editMarker(item, e) {
        e.preventDefault()
        this.props.editMarker(item);
    }

    handleCamera() {
        this.setState({ isCamera: true })
    }

    handleClose() {
        this.setState({ isCamera: false });
    };

    render() {

        return (
            <Map center={this.props.region} zoom={17} className="map">
            <TileLayer
              url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />

            {
              this.props.participants &&
                this.props.participants.map((item, index) => {

                const closemarker = this.withinRangeMarkerIndicator(item)

                let newmarkers = []
                if( item.markers.length === 0)
                   newmarkers = closemarker
                 else
                   newmarkers = closemarker ? closemarker.filter(
                    (marker) =>
                    item.markers.find((item) =>
                    {
                     return marker.marker.guid !== item.marker.guid
                   }
                     )
                   ) : []

                console.log("MapIt --> render --> item ", item)
                console.log("MapIt --> render --> newmarkers ", newmarkers)

                if(newmarkers && newmarkers.length > 0)
                    this.props.addParticipantMarker(item,newmarkers)

                const icon = divIcon({ className: 'marker ' + (closemarker && closemarker.length === 0 ? 'bus' : 'bus mark'), html: `<div>${item.account.firstname[0]}${item.account.lastname[0]}</div>`})

                return (
                  <Marker key={index}
                   icon={icon}
                    name={item}
                    position={item.coords}
                       ref="marker">
                      <Popup>
                        <span>
                        {closemarker  && closemarker.length > 0 &&
                          <Icon onClick={this.handleCamera}  className="tool-bar-items" color="action">camera</Icon>}

                        <div>
                        {item.account.firstname} {item.account.lastname}
                        </div>
                        <div>
                          {item.coords}
                        </div>
                        {item.markers && item.markers.map((item, idx) => (<div key={idx}><div>...</div>{item.marker.name} {item.details.range}m {item.details.coords && <div> {item.details.coords.join(', ')}   </div>} <div>{moment(item.details.timeStamp).format(moment.HTML5_FMT.DATETIME_LOCAL)} </div> </div>)) }
                        </span>
                      </Popup>
                  >
                  <FullScreenDialog  open={this.state.isCamera} onHandleClose={this.handleClose} onClick={this.handleClickOpen}  header={""} >
                     <CaptureMoments />
                  </FullScreenDialog>
                </Marker>



                )
              }
              )
            }
            {
                this.props.currLocation && this.props.currLocation.coords &&
                <Marker key={1}
                    position={this.props.currLocation.coords}
                    icon={divIcon({ className: 'youmarker ', html: `<div>YOU</div>`})}
                       ref="marker">
                       <Popup>
                          <div>
                          {this.props.currLocation.coords}
                          </div>
                      </Popup>
                  >
                </Marker>

            }
             {
              this.props.routeMarkers &&
                this.props.routeMarkers.map((item, index) => {

                let circlerange = "border: 1px solid #000;border-radius: 50%;height:" + item.range + "px;width:" + item.range + "px;";
                let center = "display:table-cell;vertical-align:middle;height:" + item.range + "px;width:" + item.range + "px;text-align:right;";

                const icon = divIcon({ html: `<div style="${circlerange}"><span style="${center}"> <div class="routemarker rail290">${item.name}</div></span></div>`});
                return (
                  <Marker key={index}

                    name={item}
                    position={item.coords}
                    draggable={this.props.draggable}
                      onDragend={this.updatePosition}
                       ref="marker">
                          <Popup>
                          <span>
                            <div><b>{item.name}</b> range: {item.range}m</div>
                            <div>{item.coords} </div>

                            {this.props.removeMarker  &&  this.props.updatePosition &&
                            <div>
                                <button onClick={(e) => this.editMarker(item,e)}>
                                    <i className="material-icons">edit_location</i>
                                </button>
                                <button style={{float:'right'}} onClick={(e) => this.removeMarker(item,e)}>
                                    <i className="material-icons">delete</i>
                                </button>
                              </div>
                              }
                          </span>
                        </Popup>

                  >
                </Marker>

                )
              })
            }

          </Map>
        )
    }
}

export default MapIt