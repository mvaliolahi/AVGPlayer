import {MusicManager} from "../../helpers/MusicManager/MusicManager";
import {Cache} from "../../helpers/Cache/Cache";
import {BaseLogic} from "../../helpers/Base/BaseLogic";
import {Play} from "../../redux/actions/MusicPlay";

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
        debugger;
        if (await this.notExistsCache()) {
            debugger;

            MusicManager.getAll(async (response) => {
                this.updateGridViewWith(response);
                await this.cache.set('musics', response);
            });
        } else {
            debugger;

            const musics = await this.cache.get('musics');
            this.updateGridViewWith(musics);
            // scan for new musics.
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
    gridViewItemEventHandler = (item) => {
        this.component.context.store.dispatch(Play(item));
        this.component.props.navigation.navigate('Player');
    };
}