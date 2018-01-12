import React, { Component } from 'react';
import { View, Text, Animated, StyleSheet, ScrollView, Dimensions, WebView } from 'react-native';
import Marker from 'react-native-maps';
import MapView from 'react-native-maps';
import { styles } from './styles';
import moment from 'moment'


class MapMarker extends Component {
    render() {
        const { marker } = this.props;

        return (
            <MapView.Marker
              key={marker.key}
               coordinate={marker.coords}
                title={marker.title}
                description={marker.description}
                style={styles.mapmarker}
            >

              <MapView.Callout style={styles.mapmarker_callout}>
              </MapView.Callout>
            </MapView.Marker>
        )
    }
}

export default MapMarker;