import {Pause, Play} from "../../redux/actions/Music";
import {ComponentLogic} from "../../helpers/ComponentLogic/ComponentLogic";
import {Player} from "../../helpers/Player/Player";
import TrackPlayer from "react-native-track-player";

/**
 * Player common operations.
 */
export class logic extends ComponentLogic {

    /**
     * Get Item from list and add index to it.
     *
     * @param index
     * @returns {any & {id: *}}
     */
    getMusicFromStoreByIndex(index) {
        const item = this.getMusicDataFromStore()[index];
        return Object.assign(item, {id: index})
    }

    /**
     * @returns {boolean}
     */
    isNotLastMusic() {
        const lastMusicId = this.getMusicFromStoreByIndex(this.getMusicDataFromStore().length - 1).id;
        return this.getCurrentMusic().id !== lastMusicId;
    }

    /**
     * @returns {Promise<void>}
     */
    async onNext() {
        if (this.isNotLastMusic()) {
            await this.playMusicByIndexAndUpdateUI(this.getCurrentMusic().id + 1);
        }
    }

    /**
     * @param index
     * @returns {Promise<void>}
     */
    async playMusicByIndexAndUpdateUI(index) {
        const item = this.getMusicFromStoreByIndex(index);
        this.dispatch(Play(item));
        await Player.playAsNewTrack(item);
    }

    /**
     * @returns {Promise<void>}
     */
    async onPrevious() {
        if (this.isNotFirstMusic()) {
            await this.playMusicByIndexAndUpdateUI(this.getCurrentMusic().id - 1);
        }
    }

    /**
     * @returns {boolean}
     */
    isNotFirstMusic() {
        return this.getCurrentMusic().id !== this.getMusicFromStoreByIndex(0).id;
    }

    /**
     * @returns {Promise<void>}
     */
    async onPlay() {
        if (Player.state().isPlaying()) {
            await Player.pause();
            this.dispatch(Pause());
        } else if (Player.state().isPause()) {
            await Player.play();
            this.dispatch(Play(this.getCurrentMusic()));

        } else {
            await Player.play(this.getCurrentMusic());
            this.dispatch(Play(this.getCurrentMusic()));
        }
    }

    /**
     * @returns {Promise<void>}
     */
    async onShuffle() {
        await this.playMusicByIndexAndUpdateUI(this.randomMusicIndex());
    }

    /**
     * @returns {number}
     */
    randomMusicIndex() {
        return Math.floor(Math.random() * this.getMusicDataFromStore().length);
    }

    /**
     * @returns {*}
     */
    getCurrentMusic() {
        return this.store().getState().Music;
    }

    /**
     * @returns {*}
     */
    getMusicDataFromStore() {
        return this.store().getState().MusicData;
    }

    /**
     *
     */
    ifUserComByClickOnCardsThenChangeStateToIsPlaying() {
        try {
            if (
                this.props().navigation !== undefined &&
                this.props().navigation.state.params.is_playing
            ) {
                this.setState({'isPlaying': true});
            }
        } catch (error) {
            console.log(error);
        }
    }

    //TODO:: needs to refactor!
    updateProgressUI() {
        setInterval(async () => {

            this.setState({
                music_position: await TrackPlayer.getPosition(),
                music_duration: await TrackPlayer.getDuration(),
                format: this.secondsToTimeFormat(this.state().music_duration - this.state().music_position)
            });

        }, 100);
    }

    /**
     * @param second
     * @returns {string}
     */
    secondsToTimeFormat(second) {
        second = Math.round(second);

        let hours = Math.floor(second / (60 * 60));
        let divisor_for_minutes = second % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);
        let seconds = Math.ceil(divisor_for_minutes % 60);

        return `${hours}:${minutes}:${seconds}`;
    };
}
