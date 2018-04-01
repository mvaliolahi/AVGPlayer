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