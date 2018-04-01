/**
 * @type {{PLAY: string, PAUSE: string}}
 */
export const MUSIC_PLAY_TYPE = {
    PLAY: 'MUSIC_PLAY_TYPE',
    PAUSE: 'MUSIC_PLAY_PAUSE',
};

/**
 * @param song
 * @returns {{type: string, data: {}}}
 * @constructor
 */
export const Play = (song = {}) => {
    return {
        type: MUSIC_PLAY_TYPE.PLAY,
        data: song,
    };
};

/**
 * @returns {{type: string, data: {}}}
 * @constructor
 */
export const Pause = () => {
    return {
        type: MUSIC_PLAY_TYPE.PAUSE,
        data: {}
    };
};
