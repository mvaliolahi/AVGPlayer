import React, {Component} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {Styles} from "./Styles";

export class Card extends Component {
    render() {
        return (
            <TouchableOpacity onPress={() => this.props.handler(this.props.item)}>
                <View style={[Styles.container, {width: this.props.width, height: this.props.height || 180}]}>

                    <View style={Styles.imageContainer}>
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