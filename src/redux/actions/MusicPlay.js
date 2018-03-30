export const Play = (song= {}) => {
    return {
        type : 'PLAY',
        data: song,
    };
};

export const Pause = () => {
    return {
        type: 'PAUSE',
        data: {}
    };
};