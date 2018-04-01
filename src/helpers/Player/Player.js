import TrackPlayer from 'react-native-track-player';
import {PLAYER_STATE, State} from './Operations/State';

/**
 * Track Player Wrapper.
 */
export class Player {

    /**
     * Player state: NONE | PLAYING | PAUSE | STOP
     *
     * @type {null}
     */
    static current_state = PLAYER_STATE.NONE;

    /**
     *
     * @param music
     * @param beforePlayCallback
     */
    static async play(music = null, beforePlayCallback = null) {
        if (music !== null) {
            await this.addMusicTrackListAndPlayIt(music, beforePlayCallback);
        } else {
            await this.existAMusicInTrackListJustPlayIt();
        }

        this.setState(PLAYER_STATE.PLAYING);
    }

    /**
     * @returns {Promise<void>}
     */
    static async existAMusicInTrackListJustPlayIt() {
        await TrackPlayer.play();
    }

    /**
     * @param music
     * @param beforePlayCallback
     * @returns {Promise<void>}
     */
    static async addMusicTrackListAndPlayIt(music, beforePlayCallback) {
        TrackPlayer.add(Player.convertToTrackPlayerFormat(music));
        if (beforePlayCallback !== null) {
            await beforePlayCallback();
        }
        await TrackPlayer.play();
    }

    /**
     * @returns {Promise<void>}
     */
    static async pause() {
        TrackPlayer.pause();
        this.setState(PLAYER_STATE.PAUSE);
    }

    /**
     *
     * @param music
     * @returns {Promise<void>}
     */
    static async next(music) {
        await this.stop();
        await this.play(music, async () => await TrackPlayer.skipToNext())
    }

    /**
     *
     * @param music
     * @returns {Promise<void>}
     */
    static async previous(music) {
        await this.stop();
        await this.play(music, async () => await TrackPlayer.skipToNext())
    }

    /**
     *
     * @param music
     * @returns {Promise<void>}
     */
    static async shuffle(music) {
        await this.stop();
        await this.play(music, async () => await TrackPlayer.skipToNext())
    }

    /**
     *
     */
    static async stop() {
        TrackPlayer.stop();
        this.setState(PLAYER_STATE.STOP);
    }

    /**
     *
     * @param music
     * @returns {{id, url, title: string, artist: string, artwork: string|string|string|string|string|*}}
     */
    static convertToTrackPlayerFormat(music) {
        return {
            id: music.id,
            url: music.path,
            title: music.title || 'Unknown',
            artist: music.author || 'Unknown',
            artwork: music.cover || 'Unknown',
        };
    }

    /**
     * @returns {Promise<void>}
     */
    static async getTrackPlayer() {
        await TrackPlayer.setupPlayer({});
    }

    /**
     * @param state
     */
    static setState(state) {
        this.current_state = state;
    }

    /**
     * @returns {State}
     */
    static state() {
        return new State(this.current_state);
    }
}
