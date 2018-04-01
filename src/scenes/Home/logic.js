import {MusicManager} from "../../helpers/MusicManager/MusicManager";
import {ComponentLogic} from "../../helpers/ComponentLogic/ComponentLogic";
import {Play} from "../../redux/actions/Music";
import {Player} from "../../helpers/Player/Player";
import {loadData} from "../../redux/actions/MusicData";

export class logic extends ComponentLogic {

    /**
     * @returns {Promise<void>}
     */
    async scanPhoneForMusic() {
        if (await this.thereIsNoAnyCacheForMusics()) {
            await this.scanPhoneAndSdCardForMusic();
        } else {
            await this.useCacheAsMusicDataSource();
            // TODO::scan for new musics (SYNC).
        }
    }

    /**
     * @returns {Promise<void>}
     */
    async useCacheAsMusicDataSource() {
        this.showGridView(await this.cache.get('musics'));
    }

    /**
     * @returns {Promise<void>}
     */
    async scanPhoneAndSdCardForMusic() {
        MusicManager.getAll(async (response) => {
            await this.cache.set('musics', response);
            await this.showGridView(response);
        });
    }

    /**
     * @param musics
     */
    showGridView(musics) {
        this.setState({isLoading: false});
        this.dispatch(loadData(musics));
    }

    /**
     * @returns {Promise<boolean>}
     */
    async thereIsNoAnyCacheForMusics() {
        return !await this.cache.has('musics');
    }

    /**
     * GridView Item Event Handler
     * @param item
     */
    gridViewItemEventHandler = async (item) => {
        this.dispatch(Play(item));
        this.props().navigation.navigate('Player');
        await this.playSelectedMusic(item);
    };

    async playSelectedMusic(item) {
        if (Player.state().isNone()) {
            await Player.play(item);
        } else if (Player.state().isPlaying()) {
            await Player.playAsNewTrack(item);
        }
    }
}
