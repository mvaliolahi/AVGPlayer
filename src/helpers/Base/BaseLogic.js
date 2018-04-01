import {Component} from 'react';
import {Container} from "../Container/Container";

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
    }
}