import {data as DATA} from './../../data/data';
import {Play} from "../../redux/actions/MusicPlay";
import {BaseLogic} from "../../helpers/Base/BaseLogic";

export class logic extends BaseLogic {

    data = [];

    constructor(component, data = null) {
        super(component);
        this.data = (data === null) ? DATA : data;
    }

    onNext() {
        if (this.isNotLastMusic()) {
            this.dispatch(this.data[this.getCurrentMusic().id]);
        }
    }

    isNotLastMusic() {
        return this.getCurrentMusic().id !== this.data[this.data.length - 1].id;
    }

    onPrevious() {
        if (this.isNotFirstMusic()) {
            this.dispatch(this.data[this.getCurrentMusic().id - 2]);
        }
    }

    isNotFirstMusic() {
        return this.getCurrentMusic().id !== this.data[0].id;
    }

    onPlay() {

    }

    onShuffle() {
        let item = this.data[this.randomNumberValidInDataRang()];
        this.dispatch(item);
    }

    randomNumberValidInDataRang() {
        return Math.floor(Math.random() * this.data.length);
    }

    dispatch(item) {
        this.component.context.store.dispatch(Play(item));
    }

    getCurrentMusic() {
        const state = this.component.context.store.getState();
        return state.MusicPlay;
    }
}