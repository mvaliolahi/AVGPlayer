import {Container} from "./helpers/Container/Container";
import {Cache} from './helpers/Cache/Cache';
import {Async} from './helpers/Cache/Drivers/Async';
import {Player} from "./helpers/Player/Player";

/**
 * This file act like a service-provide, when app runs
 * this files set all necessary staff for us.
 *
 * @constructor
 */
export const bootstrap = async () => {

    Container.bind('cache', () => {
        return new Cache({
            driver: Async,
            prefix: 'just-for-fun'
        });
    });

    await Player.getTrackPlayer();

};