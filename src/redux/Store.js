import {createStore, combineReducers} from 'redux';
import {MusicPlay} from './reducers/MusicPlay';

export const store = createStore(combineReducers({
    MusicPlay: MusicPlay,
}));