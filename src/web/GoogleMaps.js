import React, { Component } from "react"
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

export class MapIt extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedPlace: {},
            activeMarker: {},
            showingInfoWindow: false
        }

        this.onMarkerClick = this.onMarkerClick.bind(this)
        this.onInfoWindowClose = this.onInfoWindowClose.bind(this)
        this.onMapClicked = this.onMapClicked.bind(this)
    }

    onMarkerClick(props, marker, e) {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    }

    onInfoWindowClose() {
        this.setState({
            showingInfoWindow: false,
            activeMarker: null
        })
    }

    onMapClicked(props) {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    }

    render() {

        return (
            <Map google={this.props.google}
          style={{width: '100%', height: '100%', position: 'relative'}}
          className={'map'}
          zoom={14}
          onClick={this.onMapClicked}>
        <Marker
          onClick={this.onMarkerClick}
          name={'SOMA'}
          position={{lat: 37.778519, lng: -122.405640}} />
        <Marker
          onClick={this.onMarkerClick}
          name={'Dolores park'}
          position={{lat: 37.759703, lng: -122.428093}} />
        <Marker onClick={this.onMarkerClick}
                name={'Current location'} />

        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onInfoWindowClose}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
        </InfoWindow>

        <InfoWindow
          position={{lat: 37.765703, lng: -122.425640}}
          visible={true}>
          <small>Click on any of the markers to display an additional info.</small>
        </InfoWindow>
      </Map>
        )

    }

}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyBqK4f8zbMrK4K5cxWb8_10Zkbk7LHMrKE'
})(MapIt)