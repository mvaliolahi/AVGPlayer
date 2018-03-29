import React, {Component} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {Styles} from "./Styles";

export class Card extends Component {
    render() {
        return (
            <TouchableOpacity>
                <View style={Styles.container}>

                    <View>
                        <Image style={Styles.image} source={{uri: this.props.cover}}/>
                    </View>

                    <View style={Styles.textContainer}>
                        <Text style={Styles.album}>{this.props.album || 'unknown'}</Text>
                        <Text style={Styles.artist}>{this.props.artist || 'unknown'}</Text>
                    </View>

                </View>
            </TouchableOpacity>

        );
    }
}