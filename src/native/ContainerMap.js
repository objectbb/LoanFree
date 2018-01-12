import React, { Component } from 'react';
import { PropTypes } from 'prop-types'
import { StyleSheet, Dimensions, View, TextInput } from 'react-native';
import Map from './Map';
import { styles } from './styles';
import Toast from 'react-native-root-toast';
import { Switch } from 'react-native-switch';

import {
    values,
    flatten,
    intersection,
    words,
    some,
    includes
} from "lodash"

class ContainerMap extends Component {
    constructor(props) {
        super(props);

        this.state = {
            markers: []
        }

        this.setLocation = this.setLocation.bind(this);
    }

    componentWillMount() {
        this.setLocation(41.8827779, -87.6849345);
    }

    setLocation(latitude, longitude) {

        let { width, height } = Dimensions.get('window');
        let LATITUDEDELTA = 0.1022;
        let OFFSET = .02;

        this.setState({
            region: {
                latitude: latitude + OFFSET,
                longitude: longitude,
                latitudeDelta: LATITUDEDELTA,
                longitudeDelta: LATITUDEDELTA * (width / height),
            }
        });
    }

    generateURL(coords) {
        return "https://services.gisgraphy.com/reversegeocoding/search?format=json&lat=" +
            coords.latitude +
            "&lng=" + coords.longitude
    }

    async requestGeocode(params) {
        const URL = this.generateURL(params);

        const response = await fetch(URL)
        return await response.json()
    }

    toastMsg(msg, duration) {
        let toast = Toast.show(msg, {
            duration: duration,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
        });

    }


    render() {

        return (
            <View style={styles.containermap_container}>
              <Map region={this.state.region} marker={this.state.markers}/>
                   <Switch
                    value={true}
                    onValueChange={(val) => console.log(val)}
                    disabled={false}
                    activeText={'Edit'}
                    inActiveText={'Tracking'}
                    circleSize={30}
                    barHeight={1}
                    circleBorderWidth={3}
                    backgroundActive={'green'}
                    backgroundInactive={'gray'}
                    circleActiveColor={'#30a566'}
                    circleInActiveColor={'#000000'}
                  />
                </View>
        );
    }
}



export default ContainerMap