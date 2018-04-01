import {MUSIC_PLAY_TYPE} from "../actions/Music";

export const initialMusic = {
    id: 0,
    title: 'Unknown',
    author: 'Unknown',
    album: 'Unknown',
    cover: 'http://bob-baker.com/buzz/wp-content/uploads/2013/11/Unknown.jpg',
    path: 'https://archive.org/download/testmp3testfile/mpthreetest.mp3',
    date: "Unknown",
    duration: "10000",
    fileName: "sample.mp3",
    lyrics: "Unknown",
    state: 'PAUSE',
};

/**
 * @param state
 * @param action
 * @returns {*}
 * @constructor
 */
export const Music = (state = initialMusic, action) => {

    switch (action.type) {
        case MUSIC_PLAY_TYPE.PLAY:
            return Object.assign({}, state, fillBlankKeys(action.data), {state: 'PLAYING'});

        case MUSIC_PLAY_TYPE.PAUSE:
            return Object.assign({}, state, action.data, {state: 'PAUSE'});

        default:
            return state;
    }

};

function fillBlankKeys(object= {}) {
    return Object.assign({}, initialMusic, object)
}