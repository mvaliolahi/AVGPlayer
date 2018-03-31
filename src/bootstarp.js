import {Container} from "./helpers/Container/Container";
import {Cache} from './helpers/Cache/Cache';
import {Async} from './helpers/Cache/Drivers/Async';

/**
 * This file act like a service-provide, when app runs
 * this files set all necessary staff for us.
 *
 * @constructor
 */
export const bootstrap = () => {

    Container.bind('cache', () => {
        return new Cache({
            driver: Async,
            prefix: 'just-for-fun'
        });
    });

};