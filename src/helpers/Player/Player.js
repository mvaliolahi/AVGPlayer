import TrackPlayer from 'react-native-track-player';
import {PLAYER_STATE, State} from './Operations/State';
import {PlayerUtil} from "./Operations/PlayerUtil";

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
            await this.addMusicToPlayerModuleAndPlayIt(music, beforePlayCallback);
        } else {
            await this.musicExitsInPlayerModuleJustPlayIt();
        }

        this.setState(PLAYER_STATE.PLAYING);
    }

    /**
     * @returns {Promise<void>}
     */
    static async musicExitsInPlayerModuleJustPlayIt() {
        await TrackPlayer.play();
    }

    /**
     * @param music
     * @param beforePlayCallback
     * @returns {Promise<void>}
     */
    static async addMusicToPlayerModuleAndPlayIt(music, beforePlayCallback) {
        TrackPlayer.add(PlayerUtil.convertToTrackPlayerFormat(music));
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
    static async playAsNewTrack(music) {
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
