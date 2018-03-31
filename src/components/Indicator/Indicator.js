import React, {Component} from 'react';
import {ActivityIndicator, View} from 'react-native';

/**
 * Custom Activity Indicator.
 */
export class Indicator extends Component {

    /**
     * Constructor.
     */
    constructor() {
        super();
    }

    showIndicator () {
        return (
            <View style={{flex:1, alignItems:'center', justifyContent:'center', opacity: 0.5,}}>
                <ActivityIndicator size="large" color="#0000ff"/>
            </View>
        );
    }
    render() {
        return (
            <View style={{flex: 1, }}>
                {
                    this.props.isLoading ?
                       this.showIndicator():
                        this.props.children
                }
            </View>
        );
    }
}