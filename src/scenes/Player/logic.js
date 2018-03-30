import {data as DATA} from './../../data/data';
import {Play} from "../../redux/actions/MusicPlay";

export class logic {

    component = null;
    data = []; // pass by constructor to mock (in test)

    constructor(component, data = null) {
        this.component = component;
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