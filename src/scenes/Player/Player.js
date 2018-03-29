import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {Styles} from "./Styles";

/**
 * Player scene to play selected music file.
 */
export class Player extends Component {
    render() {
        return (
            <View style={Styles.container}>

                <View style={Styles.musicInfo}>
                    <Text style={Styles.artistText}>artist</Text>
                    <Text>music name</Text>
                </View>

                <View style={Styles.playerButtonsContainer}>
                    <View style={Styles.previousButtonContainer}>
                        <Text>{'<'}</Text>
                    </View>

                    <View style={Styles.progressContainer}>
                        <Text>Section 1</Text>
                    </View>

                    <View style={Styles.nextButtonContainer}>
                        <Text>{'>'}</Text>
                    </View>
                </View>

                <View style={Styles.bottomContainer}>
                    <Text>bottom section</Text>
                </View>

            </View>
        );
    }
}