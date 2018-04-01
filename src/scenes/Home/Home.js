import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {ActionBar} from "../../components/ActionBar/ActionBar";
import {Styles} from "./Styles";
import {GridView} from "../../components/GridView/GridView";
import {ModalView} from "../../components/Modal/ModalView";
import {Player} from "../Player/Player";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {logic} from "./logic";
import {Indicator} from "../../components/Indicator/Indicator";
import TrackPlayer from "react-native-track-player";

export class Home extends Component {

    logic = null;

    constructor() {
        super();
        this.state = {isLoading: true};

        this.logic = new logic(this);
    }

    async componentDidMount() {
        await this.logic.scanPhoneForMusic();
        TrackPlayer.registerEventHandler(async (data) => {
        });
    }

    render() {

        return (
            <Indicator isLoading={this.state.isLoading}>
                <View style={Styles.container}>

                    {/*Action-Bar*/}
                    <ActionBar title='AGV Player' color='#4A148C'/>

                    {/*GridView*/}
                    <View style={Styles.cardContainer}>
                        <GridView dataSource={this.props.music_data} columns={3}
                                  itemEvent={this.logic.gridViewItemEventHandler}/>
                    </View>

                    {/*Player-Indicator*/}
                    <View style={Styles.modalIndicatorContainer}>
                        <ModalView>
                            <Player is_music_playing={this.props.is_music_playing}/>
                        </ModalView>

                        <View style={Styles.modalIndicatorTextContainer}>
                            <Text style={Styles.modalIndicatorText}>{this.props.music.title}</Text>
                        </View>
                    </View>

                </View>
            </Indicator>
        );
    }
}

Home.contextTypes = {
    store: PropTypes.object
};

const mapToProps = (state) => {
    return {
        music: state.Music,
        music_data: state.MusicData,
        is_music_playing: state.Music.state === 'PLAYING',
    };
};

export default connect(mapToProps)(Home);
