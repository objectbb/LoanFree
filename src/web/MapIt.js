import React, { Component } from "react";
import classnames from "classnames";
import { connect } from "react-redux";
import { Map, Marker, TileLayer, Popup } from 'react-leaflet';
import { divIcon, point } from "leaflet";

import AppCss from "./app.css";

const cover = { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 };

class MapIt extends Component {

    constructor(props) {
        super(props);
        this.updatePosition = this.updatePosition.bind(this);
    }

    updatePosition(e) {

        let item = e.target.options.name;
        let latlng = this.refs.marker.leafletElement.getLatLng();

        item.coords = [latlng.lat, latlng.lng]

        this.props.updatePosition(item);
    }

    render() {

        return (

            <div style={cover}>
          <Map center={this.props.region} zoom={14} style={cover}>
            <TileLayer
              url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />

            {
              this.props.participants.map((item, index) => {
                return (
                  <Marker key={index}
                  name={item}
                  position={item.coords}
                  draggable={this.props.draggable}
                      onDragend={this.updatePosition}
                       ref="marker">
                      <Popup minWidth={90}>
                        <span>
                          {item.name.first} {item.name.last}
                        </span>
                      </Popup>
                  ></Marker>

                )
              })
            }

          </Map>
        </div>
        )
    }
}


export default MapIt