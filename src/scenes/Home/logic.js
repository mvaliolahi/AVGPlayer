import {MusicManager} from "../../helpers/MusicManager/MusicManager";
import {Cache} from "../../helpers/Cache/Cache";
import {BaseLogic} from "../../helpers/Base/BaseLogic";
import {Play} from "../../redux/actions/MusicPlay";
import {Application} from "../../helpers/Application/Application";
import {Player} from "../../helpers/Player/Player";

export class logic extends BaseLogic {

    /**
     * @type Cache
     */
    cache = null;

    /**
     * @param component
     * @param cache
     */
    constructor(component, cache) {
        super(component);
        this.cache = cache;
    }

    /**
     * @returns {Promise<void>}
     */
    async scanPhoneForMusic() {
        if (await this.notExistsCache()) {
            MusicManager.getAll(async (response) => {
                this.updateGridViewWith(response);
                await this.cache.set('musics', response);
                Application.setAppData(response);
            });
        } else {
            const musics = await this.cache.get('musics');
            this.updateGridViewWith(musics);
            Application.setAppData(musics);
            // scan for new musics (SYNC).
        }
    }

    /**
     * @param data
     */
    updateGridViewWith(data) {
        this.component.setState({songs: data, isLoading: false});
    }

    /**
     * @returns {Promise<boolean>}
     */
    async notExistsCache() {
        return !await this.cache.has('musics');
    }

    /**
     * GridView Item Event Handler
     * @param item
     */
    gridViewItemEventHandler = async (item) => {
        this.component.context.store.dispatch(Play(item));
        this.component.props.navigation.navigate('Player', {'is_playing': true});
        await this.playSelectedMusic(item);
    };

    async playSelectedMusic(item) {
        if (Player.state().isNone()) {
            await Player.play(item);
        } else if (Player.state().isPlaying()) {
            await Player.next(item);
        }
    }
}
