import {createStore, combineReducers} from 'redux';
import {Music} from './reducers/Music';
import {MusicData} from "./reducers/MusicData";

export const store = createStore(combineReducers({
    Music: Music,
    MusicData: MusicData
}));