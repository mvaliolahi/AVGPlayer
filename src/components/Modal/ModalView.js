import React, {Component} from 'react';
import {Modal, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {Styles} from './Styles';

export class ModalView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isVisible: false,
        };
    }

    show() {
        this.setState({isVisible: true});
    }

    hide() {
        this.setState({isVisible: false});
    }

    render() {
        return (
            <View style={Styles.container}>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.isVisible}
                    onRequestClose={() => this.hide()}>

                    <View style={Styles.content}>
                        <View style={[Styles.icon, {margin: 8}]}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.hide();
                                }}>
                                <Icon name={'angle-down'} size={25} color={'#FFFFFF'}/>
                            </TouchableOpacity>
                        </View>
                        {this.props.children}
                    </View>

                </Modal>

                <View style={[Styles.Icon,]}>
                    <TouchableOpacity
                        onPress={() => this.show()}>
                        <Icon name={'angle-up'} size={25} color={'#FFFFFF'}/>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}