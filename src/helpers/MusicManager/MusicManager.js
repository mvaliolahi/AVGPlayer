import {NativeModules} from "react-native";

/**
 * Wrapper for Get-Music Native Module.
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
     * Check Phone Memory for music files, and return it as array.
     * return value is base on predefined tags.
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
     * Return GetMusicFiles NativeModule
     * @returns {*}
     */
    static getNativeModule() {
        return NativeModules.RNReactNativeGetMusicFiles;
    };
}