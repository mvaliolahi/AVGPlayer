import {StyleSheet} from 'react-native';

export const Styles = StyleSheet.create({
    container: {
        borderWidth: 0.1,
        borderColor: '#d6d7da',
        margin: 3,
        elevation: 1,
    },

    imageContainer: {
        flex: 5,
    },

    image: {
        width: '100%',
        height: '100%',
    },

    textContainer: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    album: {
        color: '#33372c',
        fontWeight: 'bold',
    },

    artist: {
        color: '#5c634f',
    },


});