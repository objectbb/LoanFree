import React, { Component } from "react"
import { connect } from "react-redux"
import MapIt from './MapIt'

class RouteMaker extends Component {

    constructor(props) {
        super(props);
        this.state = {
            markers: [{
                    index: 0,
                    guid: "62c63de1-52f3-43f2-ba69-a21b8ead0a5f",
                    name: {
                        first: "Angelita",
                        last: "Bird"
                    },
                    coords: [
                        45.127247, -122.5760278
                    ]
                },
                {
                    index: 1,
                    guid: "122720d7-4b50-494f-b4a7-44aa0071305a",
                    name: {
                        "first": "Phyllis",
                        "last": "Wood"
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
    }

    addMarker(item) {
        this.setState(prevState => ({
            marker: [...prevState.marker, item]
        }))
    }

    removeMarker(item) {

        this.setState(prevState => ({
            marker: [...prevState.marker, item]
        }))
    }

    updatePosition(item) {

        console.log(item.coords)
        let immumarkers = [...this.state.markers];

        let upmarker = immumarkers.find((marker) => marker.guid === item.guid);
        upmarker.coords = item.coords;

        console.log(this.state.markers)

    }

    render() {

        return (
            <div>
                <MapIt
                  participants={this.state.markers}
                  region={this.state.region}
                   draggable={true}
                   updatePosition={this.updatePosition}

                />

          </div>
        )
    }
}

export default RouteMaker