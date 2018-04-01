import {MUSIC_DATA_TYPE} from "../actions/MusicData";

/**
 * @param state
 * @param action
 * @returns {*}
 * @constructor
 */
export const MusicData = (state = [], action) => {
    switch (action.type) {
        case MUSIC_DATA_TYPE.LOAD :
            return action.data;

        case MUSIC_DATA_TYPE.CLEAR:
            return [];

        default:
            return state;
    }
};