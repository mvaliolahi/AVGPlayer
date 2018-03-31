import {Component} from 'react';

/**
 * Base Class for all Component logic, to follow DRY rule.
 */
export class BaseLogic {

    /**
     *
     * @type Component
     */
    component = null;

    /**
     * Constructor.
     *
     * @param component
     */
    constructor(component) {
        this.component = component;
    }
}