import {Play} from "../../redux/actions/MusicPlay";
import {BaseLogic} from "../../helpers/Base/BaseLogic";
import {Player} from "../../helpers/Player/Player";

/**
 * Player common operations.
 */
export class logic extends BaseLogic {

    /**
     * Cache data.
     *
     * @type {Array}
     */
    data = [];

    /**
     * Constructor.
     *
     * @param component
     * @param data
     */
    constructor(component, data = null) {
        super(component);
        this.data = data;
    }

    /**
     * Get Item from list and add index to it.
     *
     * @param index
     * @returns {any & {id: *}}
     */
    getMusicFromList(index) {
        const item = this.data[index];
        return Object.assign(item, {id: index})
    }

    /**
     * @returns {boolean}
     */
    isNotLastMusic() {
        return this.getCurrentMusic().id !== this.getMusicFromList(this.data.length - 1).id;
    }

    /**
     * @returns {Promise<void>}
     */
    async onNext() {
        if (this.isNotLastMusic()) {
            const item = this.getMusicFromList(this.getCurrentMusic().id + 1);
            this.dispatch(item);
            await Player.next(item);
            this.component.setState({isPlaying: true});
        }
    }

    /**
     * @returns {Promise<void>}
     */
    async onPrevious() {
        if (this.isNotFirstMusic()) {
            const item = this.getMusicFromList(this.getCurrentMusic().id - 1);
            this.dispatch(item);

            await Player.previous(item);
            this.component.setState({isPlaying: true});
        }
    }

    /**
     * @returns {boolean}
     */
    isNotFirstMusic() {
        return this.getCurrentMusic().id !== this.getMusicFromList(0).id;
    }

    /**
     * @returns {Promise<void>}
     */
    async onPlay() {
        if (Player.state().isPlaying()) {
            await Player.pause();
            this.component.setState({isPlaying: false});
        } else if (Player.state().isPause()) {
            await Player.play();
            this.component.setState({isPlaying: true});
        } else {
            await Player.play(this.getCurrentMusic());
            this.component.setState({isPlaying: true});
        }
    }

    /**
     * @returns {Promise<void>}
     */
    async onShuffle() {
        let item = this.getMusicFromList(this.randomNumberValidInDataRang());
        this.dispatch(item);

        await Player.shuffle(item);
        this.component.setState({isPlaying: true});
    }

    /**
     * @returns {number}
     */
    randomNumberValidInDataRang() {
        return Math.floor(Math.random() * this.data.length);
    }

    /**
     * Dispatch Play action to store.
     *
     * @param item
     */
    dispatch(item) {
        this.component.context.store.dispatch(Play(item));
    }

    /**
     * @returns {*}
     */
    getCurrentMusic() {
        const state = this.component.context.store.getState();
        return state.MusicPlay;
    }

    /**
     *
     */
    checkIfUserComAfterTabCardThenChangeStateToIsPlaying() {
        try {
            if (
                this.component.props.navigation !== undefined &&
                this.component.props.navigation.state.params.is_playing
            ) {
                this.component.setState({'isPlaying': true});
            }
        }catch(error) {
            console.log(error);
        }
    }
}
