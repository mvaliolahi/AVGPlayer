export const MUSIC_DATA_TYPE = {
    LOAD: "LOAD_MUSIC_DATA",
    CLEAR: "CLEAR_MUSIC_DATA",
};

/**
 * @param musics
 * @returns {{type: string, data: Array}}
 */
export const loadData = (musics= []) => {
    return {
        type: MUSIC_DATA_TYPE.LOAD,
        data: musics
    }
};

export const clearData = () => {
    return {
        type: MUSIC_DATA_TYPE.CLEAR,
        data: []
    }
};