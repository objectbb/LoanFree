import React, { Component } from "react"
import { connect } from "react-redux"
import MapIt from './MapIt'
import style from "./app.css";
import uuid from 'uuid';


class RouteMaker extends Component {

    constructor(props) {
        super(props);
        this.state = {
            markers: [{
                    index: 0,
                    guid: "62c63de1-52f3-43f2-ba69-a21b8ead0a5f",
                    place: {
                        name: "Point Blank 1"
                    },
                    coords: [
                        45.127247, -122.5760278
                    ]
                },
                {
                    index: 1,
                    guid: "122720d7-4b50-494f-b4a7-44aa0071305a",
                    place: {
                        name: "Point Blank 2"
                    },
                    coords: [
                        45.130317, -122.593637
                    ]
                }
            ],
            region: [
                45.127247, -122.5760278,
            ]
        };

        this.addMarker = this.addMarker.bind(this);
        this.updatePosition = this.updatePosition.bind(this);
           this.removeMarker = this.removeMarker.bind(this);
    }

    addMarker() {
        let offset = .002
        let length = this.state.markers.length;

        let lastcoords = this.state.markers[length - 1].coords;
        let item = { coords: [lastcoords[0] + offset, lastcoords[1] + offset] };
        item.place = {name: "Marker #" + length + 1}
        item.guid = uuid.v1();

        this.setState(prevState => ({
            markers: [...prevState.markers, item]
        }))
    }

    removeMarker(item) {
        console.log(item);
        let newmarkers = this.state.markers.filter((marker) => marker.guid !== item.guid);
        console.log(newmarkers);

        this.setState({ markers: newmarkers });


    }

    updatePosition(item) {

        console.log(item.coords)
        let immumarkers = [...this.state.markers];

        let upmarker = immumarkers.find((marker) => marker.guid === item.guid);
        upmarker.coords = item.coords;

        console.log(this.state.markers)

    }

    render() {
   const toolbar = { float: 'right',  borderStyle: 'solid', borderWidth: '5px' };

        return (

            <div>
                <MapIt
                  participants={this.state.markers}
                  removeMarker={this.removeMarker}
                  region={this.state.region}
                   draggable={true}
                   updatePosition={this.updatePosition}

                />

                <div style={toolbar}>
                <button onClick={this.addMarker} >
                 <i className="material-icons">add_location</i>
                  </button>
                  </div>
          </div>
        )
    }
}

export default RouteMaker
