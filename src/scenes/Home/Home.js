import React, {Component} from 'react';
import {View} from 'react-native';
import {Card} from "../../components/Card/Card";
import {ActionBar} from "../../components/ActionBar/ActionBar";
import {Styles} from "./Styles";

const data = [
    {
        id: 1,
        artist: 'ColdPlay',
        album: '2015',
        cover: 'http://daxushequ.com/data/out/35/img59872010.jpg'
    },
    {
        id: 2,
        artist: 'Meysam',
        album: '2018',
        cover: 'http://daxushequ.com/data/out/35/img59908615.jpg'
    },
];

export class Home extends Component {
    render() {
        return (
            <View style={Styles.container}>

                <ActionBar title='AVG Player'/>

                <View style={Styles.cardContainer}>
                    {
                        data.map(({id, artist, album, cover}) => {
                            return (
                                <Card
                                    key={id}
                                    artist={artist}
                                    album={album}
                                    cover={cover}
                                />
                            );
                        })
                    }
                </View>
            </View>
        );
    }
}