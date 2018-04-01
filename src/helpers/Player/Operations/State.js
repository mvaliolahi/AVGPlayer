/**
 * @type {{PLAYING: string, PAUSE: string, STOP: string, NONE: string}}
 */
export const PLAYER_STATE = {
    PLAYING: 'PLAYING',
    PAUSE: 'PAUSE',
    STOP: 'STOP',
    NONE: 'NONE',
};

/**
 * Player State Holder.
 */
export class State {

    /**
     * @type {string}
     */
    state = PLAYER_STATE.NONE;

    /**
     * @param state
     */
    constructor(state) {
        this.state = state;
    }

    /**
     * @returns {boolean}
     */
    isPlaying() {
        return this.state === PLAYER_STATE.PLAYING;
    }

    /**
     * @returns {boolean}
     */
    isStop() {
        return this.state === PLAYER_STATE.STOP;
    }

    /**
     * @returns {boolean}
     */
    isNone() {
        return this.state === PLAYER_STATE.NONE;
    }

    /**
     * @returns {boolean}
     */
    isPause() {
        return this.state === PLAYER_STATE.PAUSE;
    }
}