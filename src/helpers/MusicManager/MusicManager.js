import {NativeModules} from "react-native";

/**
 * Wrapper for Get-Music-Files Module.
 */
export class MusicManager {

    /**
     * All tags we need from a music.
     *
     * @param tags
     * @returns {*}
     */
    static tags(tags) {
        if (tags !== null) {
            return tags;
        }

        return {
            blured: false,
            artist: true,
            duration: true,
            cover: true,
            genre: true,
            title: true,
            date: true,
            lyrics: true,
            comments: true,
            minimumSongDuration: 10000,
        };
    }

    /**
     * Check memory for musics file, and return result as an array.
     * return value is dependent to tags.
     *
     * @param successCallback
     * @param failCallback
     * @param tags
     * @returns {Promise<void>}
     */
    static async getAll(successCallback, failCallback = (e) => console.log(e), tags = null) {
        MusicManager.getNativeModule().getAll(
            MusicManager.tags(tags),
            (error) => failCallback(error),
            async (response) => successCallback(response)
        );
    }

    /**
     * Return GetMusicFiles Module
     * @returns {*}
     */
    static getNativeModule() {
        return NativeModules.RNReactNativeGetMusicFiles;
    };
}