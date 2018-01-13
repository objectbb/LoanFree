import React, { Component } from "react";
import classnames from "classnames";
import { connect } from "react-redux";

import { Map, Marker, TileLayer, Popup } from 'react-leaflet';
import { divIcon, point } from "leaflet";
import AppCss from "./app.css";


class MapIt extends Component {

    constructor(props) {
        super(props);
        this.updatePosition = this.updatePosition.bind(this);
        this.removeMarker = this.removeMarker.bind(this);

    }

    updatePosition() {

        console.log(this.leafletMap)
        let item = this.leafletMap.leafletElement.options.name;
        let latlng = this.leafletMap.leafletElement.getLatLng();

        item.coords = [latlng.lat, latlng.lng]

        this.props.updatePosition(item);
    }

    removeMarker(item,e) {
        e.preventDefault()
        this.props.removeMarker(item);
    }

    render() {
        const cover = { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0,zIndex: -1 };

        return (


            <Map center={this.props.region} zoom={14} style={cover}>
            <TileLayer
              url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />

            {
              this.props.participants.map((item, index) => {

/*
                let classes = {
                  [AppCss.marker]: true
                }

                classes[AppCss[`rail${item.routeNumber}`]] = true;

*/

                const mapMarker = {borderRadius: '15px', border: '1px solid #FFF',height: '30px'};

                const icon = divIcon({ className: mapMarker, html: `<div style="border-width: 2px 10px 4px 20px">${item.place.name}</div>`});
                return (
                  <Marker key={index}
                   icon={icon}
                  name={item}
                  position={item.coords}
                  draggable={this.props.draggable}
                      onDragend={this.updatePosition}
                       ref={m => { this.leafletMap = m; }}>
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
