const initialState = {
    id: 0,
    name: 'Unknown',
    artist: 'Unknown',
    album: 'Unknown',
    cover: 'http://bob-baker.com/buzz/wp-content/uploads/2013/11/Unknown.jpg',
};

export const MusicPlay = (state = initialState, action) => {

    switch (action.type) {
        case 'PLAY':
            return Object.assign({}, state, action.data);

        case 'PAUSE':
            return Object.assign({}, state, action.data);

        default:
            return state;
    }

};