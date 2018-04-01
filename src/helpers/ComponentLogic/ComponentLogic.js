import {Component} from 'react';
import {Container} from "../Container/Container";
import {Cache} from '../Cache/Cache';

/**
 * Base Class for all Component logic, to follow DRY rule.
 */
export class ComponentLogic {

    /**
     *
     * @type Cache
     */
    cache = null;

    /**
     *
     * @type Component
     */
    component = null;

    /**
     *
     * @type Container
     */
    container = null;

    /**
     * Constructor.
     *
     * @param component
     */
    constructor(component) {
        this.component = component;
        this.container = Container;
        this.cache = Container.make('cache');
    }

    /**
     * @param action
     */
    dispatch(action) {
        this.component.context.store.dispatch(action);
    }

    /**
     * @param state
     */
    setState(state) {
        this.component.setState(state);
    }

    /**
     * @returns {*}
     */
    props() {
        return this.component.props;
    }

    /**
     *
     */
    store() {
        return this.component.context.store;
    }
}