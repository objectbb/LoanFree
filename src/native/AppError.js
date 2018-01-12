import React, { Component } from 'react';
import { StyleSheet, View, Text, Dimensions, ScrollView } from 'react-native';
import { styles } from './styles';

class AppError extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Text>
            {this.props.error}
            </Text>
        );
    }
}

function mapStateToProps(state) {
    const { error } = state

    return {
        error
    }
}
export default AppError;