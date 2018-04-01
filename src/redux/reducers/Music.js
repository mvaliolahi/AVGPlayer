import {MUSIC_PLAY_TYPE} from "../actions/Music";

const initialState = {
    id: 0,
    title: 'Unknown',
    author: 'Unknown',
    album: 'Unknown',
    cover: 'http://bob-baker.com/buzz/wp-content/uploads/2013/11/Unknown.jpg',
    path: 'https://archive.org/download/testmp3testfile/mpthreetest.mp3',
    date: "2018",
    duration: "267000",
    fileName: "sample.mp3",
    lyrics: "",
    state: 'PAUSE',
};

/**
 * @param state
 * @param action
 * @returns {*}
 * @constructor
 */
export const Music = (state = initialState, action) => {

    switch (action.type) {
        case MUSIC_PLAY_TYPE.PLAY:
            return Object.assign({}, state, action.data, {state: 'PLAYING'});

        case MUSIC_PLAY_TYPE.PAUSE:
            return Object.assign({}, state, action.data, {state: 'PAUSE'});

        default:
            return state;
    }

};