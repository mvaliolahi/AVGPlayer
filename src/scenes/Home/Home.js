import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {ActionBar} from "../../components/ActionBar/ActionBar";
import {Styles} from "./Styles";
import {GridView} from "../../components/GridView/GridView";
import {ModalView} from "../../components/Modal/ModalView";
import {Player} from "../Player/Player";
// import {MusicManager} from "../../helpers/MusicManager/MusicManager"; // Native-Module
import {data} from './../../data/data';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {Play} from "../../redux/actions/MusicPlay";

export class Home extends Component {

    gridItemHandler = (item) => {
        this.context.store.dispatch(Play(item));
        this.props.navigation.navigate('Player');
    };

    render() {
        return (
            <View style={Styles.container}>

                {/*Action-Bar*/}
                <ActionBar title='AGV Player' color='#FFFFFF'/>

                {/*GridView*/}
                <View style={Styles.cardContainer}>
                    <GridView dataSource={data} columns={3} itemHandler={this.gridItemHandler}/>
                </View>

                {/*Player-Indicator*/}
                <View style={Styles.modalIndicatorContainer}>
                    <ModalView>
                        <Player/>
                    </ModalView>

                    <View style={Styles.modalIndicatorTextContainer}>
                        <Text style={Styles.modalIndicatorText}>{this.props.music.name}</Text>
                    </View>
                </View>

            </View>
        );
    }
}

Home.contextTypes = {
    store: PropTypes.object
};

const mapToProps = (state) => {
    return {
        music: state.MusicPlay,
    };
};

export default connect(mapToProps)(Home);