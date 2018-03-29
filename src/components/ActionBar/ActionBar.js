import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Styles} from "./Styles";

export class ActionBar extends Component {
    render() {
        return (
            <View style={Styles.container}>
                <Text style={Styles.title}>{this.props.title}</Text>
            </View>
        );
    }
}