import React, { Component } from "react";
import classnames from "classnames";
import { connect } from "react-redux";
import geolib from "geolib";

import { Map, Marker, TileLayer, Popup } from 'react-leaflet';
import { divIcon, point } from "leaflet";
import AppCss from "./app.css";


class MapIt extends Component {

    constructor(props) {
        super(props);
        this.updatePosition = this.updatePosition.bind(this);
        this.removeMarker = this.removeMarker.bind(this);
        this.closeIndicator = this.closeIndicator.bind(this);
    }

    closeIndicator(coords) {

        return this.props.routeMarkers.some((marker) => {
            let distance = geolib.getDistance({ latitude: coords[0], longitude: coords[1] }, { latitude: marker.coords[0], longitude: marker.coords[1] })
            return distance < marker.range
        });
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

    render() {
        const cover = { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, zIndex: -1 };

        return (
            <Map center={this.props.region} zoom={17} style={cover}>
            <TileLayer
              url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />

            {
              this.props.participants &&
                this.props.participants.map((item, index) => {

                let cI = this.closeIndicator(item.coords);

                const icon = divIcon({ className: 'marker ' + (!cI ? 'bus' : 'bus mark'), html: `<div>${item.name.first[0]}${item.name.last}</div>`})

                return (
                  <Marker key={index}
                   icon={icon}
                    name={item}
                    position={item.coords}
                       ref="marker">
                      <Popup minWidth={90}>
                        <span>
                        <div>
                        {item.name.first} {item.name.last}
                        </div>
                        <div>
                          {item.coords}
                        </div>
                        </span>
                      </Popup>
                  >
                </Marker>

                )
              }
              )
            }
            {
                this.props.currLocation &&
                <Marker key={1}
                    position={this.props.currLocation}
                    icon={divIcon({ className: 'youmarker ', html: `<div>YOU</div>`})}
                       ref="marker">
                       <Popup minWidth={90}>
                          <div>{this.props.currLocation}</div>
                      </Popup>
                  >
                </Marker>

            }
             {
              this.props.routeMarkers &&
                this.props.routeMarkers.map((item, index) => {


                let circlerange = "border: 1px solid #000;border-radius: 50%;height:" + item.range + "px;width:" + item.range + "px;";
                let center = "display:table-cell;vertical-align:middle;height:" + item.range + "px;width:" + item.range + "px;text-align:right;";

                const icon = divIcon({ html: `<div style="${circlerange}"><span style="${center}"> <div class="routemarker rail290">${item.place.name}</div></span></div>`});
                return (
                  <Marker key={index}
                   icon={icon}
                    name={item}
                    position={item.coords}
                    draggable={this.props.draggable}
                      onDragend={this.updatePosition}
                       ref="marker">
                      <Popup minWidth={90}>
                        <span>
                          {item.place.name}
                          <div>
                          <button>
                              <i className="material-icons">edit_location</i>
                          </button>
                          <button onClick={(e) => this.removeMarker(item,e)}>
                              <i className="material-icons">delete</i>
                          </button>
                          </div>
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
