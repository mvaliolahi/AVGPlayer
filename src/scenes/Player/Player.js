import React, {Component} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {Styles} from "./Styles";
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {logic} from "./logic";
import ProgressCircle from 'react-native-progress-circle';


/**
 * Player scene to play selected music file.
 */
export class Player extends Component {

    logic = null;

    constructor() {
        super();

        this.state = {
            music_position: 0,
            music_duration: 0,
        };

        this.logic = new logic(this);
    }

    getMusic(key) {
        return this.context.store.getState().Music[key] || 'Unknown';
    }

    async componentDidMount() {
        this.logic.ifUserComByClickOnCardsThenChangeStateToIsPlaying();
        this.logic.updateProgressUI();
    }

    render() {

        return (
            <View style={[Styles.container]}>

                {/*FullScreen Blur-Cover*/}
                <View style={Styles.coverImage}>
                    <Image
                        blurRadius={1}
                        style={{height: '100%', width: '100%'}}
                        source={{uri: this.getMusic('cover')}}
                    />
                </View>

                {/*Header - Artist details*/}
                <View style={Styles.musicInfoContainer}>
                    <Text style={Styles.artistName}>{this.getMusic('author')}</Text>
                    <Text style={Styles.songName}>{this.getMusic('title')}</Text>
                </View>

                {/*Middle - getPlayer layout*/}
                <View style={Styles.playerContainer}>


                    <View style={Styles.playerViewContainer}>

                        {/*PreviousTrack*/}
                        <TouchableOpacity onPress={() => this.logic.onPrevious()}>
                            <View style={Styles.prevContainer}>
                                <Icon name='backward' size={25} color={'#FFFFFF'}/>
                            </View>
                        </TouchableOpacity>

                        {/*Timer*/}
                        <View style={Styles.timerContainer}>
                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>

                                <ProgressCircle
                                    percent={(this.state.music_position * 100) / this.state.music_duration}
                                    radius={120}
                                    borderWidth={4}
                                    color="#3399FF"
                                    shadowColor="#999"
                                    bgColor="#fff"
                                >
                                    <View style={Styles.progressBar.container}>
                                        <Image style={Styles.progressBar.image}
                                               source={{uri: this.getMusic('cover')}}/>
                                        <Text style={Styles.progressBar.text}>{this.state.format}</Text>
                                    </View>
                                </ProgressCircle>

                            </View>
                        </View>

                        {/*Next-Track*/}
                        <TouchableOpacity onPress={() => this.logic.onNext()}>
                            <View style={Styles.nextContainer}>
                                <Icon name='forward' size={25} color={'#FFFFFF'}/>
                            </View>
                        </TouchableOpacity>
                    </View>


                    <View style={Styles.playerButtonsContainer}>
                        {/*Play / Pause-Button*/}
                        <TouchableOpacity onPress={async () => this.logic.onPlay()}>
                            <View style={Styles.playPauseButtonContainer}>
                                <Icon name={this.props.is_music_playing ? 'pause' : 'play'} size={25}
                                      color={'#FFFFFF'}/>
                            </View>
                        </TouchableOpacity>

                        {/*Shuffle-Button*/}
                        <TouchableOpacity onPress={() => this.logic.onShuffle()}>
                            <View style={Styles.randomButtonContainer}>
                                <Icon name={'random'} size={25} color={'#FFFFFF'}/>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>

                {/*Footer */}
                <View style={Styles.footer}>

                    {/*Small Cover*/}
                    <View style={Styles.footerImageContainer}>
                        <Image
                            style={Styles.footerImage}
                            source={{uri: this.getMusic('cover')}}
                        />
                    </View>

                    {/*Music Info*/}
                    <View style={Styles.footerMusicInfo}>
                        <Text style={Styles.footerSongName}>{this.getMusic('title')}</Text>
                        <Text
                            style={Styles.footerArtistName}>{
                            this.getMusic('author').length > 20 ?
                                this.getMusic('author').substring(0, this.getMusic('author').length / 2) :
                                this.getMusic('author')
                        }</Text>
                    </View>

                    {/*Icon*/}
                    <View style={Styles.footerIcon}>
                        <Icon name='linux' size={25} color={'#FFFFFF'}/>
                    </View>

                </View>

            </View>
        );
    }
}


Player.contextTypes = {
    store: PropTypes.object
};

const mapToProps = (state) => {
    return {
        music: state.Music,
        is_music_playing: state.Music.state === 'PLAYING',
        music_data: state.MusicData,
    };
};

export default connect(mapToProps)(Player);