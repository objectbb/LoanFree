import React, { Component } from 'react';
import { StyleSheet, View, Text, Dimensions, ScrollView } from 'react-native';
import MapView from 'react-native-maps';
import MapMarker from './MapMarker';
import { styles } from './styles';

class Map extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (

            <MapView
              provider={this.props.provider}
              region={this.props.region}
              style={styles.map}
              scrollEnabled={true}
              zoomEnabled={true}
              pitchEnabled={false}
              rotateEnabled={false}
            >
             {this.props.markers &&
              this.props.markers.map((marker) =>
              <MapMarker
                marker={marker}
                />)
              }
            </MapView>

        );
    }
}

export default Map;