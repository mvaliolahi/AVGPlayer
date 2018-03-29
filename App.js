import React, {Component} from 'react';
import {TabNavigator} from "react-navigation";
import {Routes} from './src/routes/Routes';
import {TabOptions} from './src/routes/TabOptions';

const Router = new TabNavigator(Routes, TabOptions);

type Props = {};
export default class App extends Component<Props> {
    render() {
        return <Router/>;
    }
}