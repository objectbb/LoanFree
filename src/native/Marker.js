import React, { Component, View, Text, Animated, StyleSheet } from 'react-native';
import { Marker } from 'react-native-maps';
import { styles } from './styles';

export default class MapMarker extends Component {
    render() {
        const { title, description, coordinate } = this.props;

        return (
            <Marker coordinate={coordinate}>
                <View style={styles.marker}>
                    <Text style={styles.marker_text}>{description}</Text>
                </View>
            </Marker>
        )
    }
}