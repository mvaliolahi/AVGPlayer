import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {ActionBar} from "../../components/ActionBar/ActionBar";
import {Styles} from "./Styles";
import {GridView} from "../../components/GridView/GridView";
import {ModalView} from "../../components/Modal/ModalView";
import {Player} from "../Player/Player";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {Container} from "../../helpers/Container/Container";
import {logic} from "./logic";
import {Indicator} from "../../components/Indicator/Indicator";

export class Home extends Component {

    logic = null;

    constructor() {
        super();
        this.state = {
            isLoading: true,
            songs: [],
        };

        this.logic = new logic(this, Container.make('cache'));
    }

    async componentDidMount() {
        await this.logic.scanPhoneForMusic();
    }

    render() {

        return (
            <Indicator isLoading={this.state.isLoading}>
                <View style={Styles.container}>

                    {/*Action-Bar*/}
                    <ActionBar title='AGV Player' color='#FFFFFF'/>

                    {/*GridView*/}
                    <View style={Styles.cardContainer}>
                        <GridView dataSource={this.state.songs} columns={3}
                                  itemEvent={this.logic.gridViewItemEventHandler}/>
                    </View>

                    {/*Player-Indicator*/}
                    <View style={Styles.modalIndicatorContainer}>
                        <ModalView>
                            <Player/>
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
        music: state.MusicPlay,
    };
};

export default connect(mapToProps)(Home);