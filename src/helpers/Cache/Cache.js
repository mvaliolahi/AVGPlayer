export class Cache {

    /*
    Current cache TrackPlayer.
     */
    driver = null;

    /*
    Cache constructor.
     */
    constructor(config = {}) {
        this.driver = new config.driver({prefix: config.prefix});
    }

    /*
    Cache data, return false if cache exits.
     */
    add(key, value, second = null) {
        if (this.driver.has(key)) {
            return false;
        }

        this.driver.set(key, value, second);
        return true;
    }

    /*
    Cache data without expire time.
     */
    forever(key, value) {
        return this.driver.set(key, value, null);
    }

    /*
    Add new cache or change exist one.
     */
    set(key, value, second = null) {
        return this.driver.set(key, value, second);
    }

    /*
    Add new cache or change exist one.
    */
    put(key, value, second = null) {
        return this.driver.set(key, value, second);
    }

    /*
    Retrieve data from cache.
     */
    get(key) {
        return this.driver.get(key);
    }

    /*
    Retrieve data from cache.
     */
    pull(key) {
        return this.driver.get(key);
    }

    /*
    Check if key cached return true otherwise return false.
     */
    has(key) {
        return this.driver.has(key);
    }

    /*
    Remembers callback result until expired, after that execute callback for playAsNewTrack loop.
     */
    remember(key, callback, second = 60) {
        return this.driver.remember(key, callback, second);
    }

    /*
    Remember without expire time.
     */
    rememberForever(key, callback) {
        return this.driver.remember(key, callback, null);
    }

    /*
    Remove item from cache.
     */
    forget(key) {
        return this.driver.forget(key);
    }

    /*
    Remove item from cache.
     */
    delete(key) {
        return this.driver.forget(key);
    }

    /*
    Remove all expired items, this method should be executed after a while to prevent memory leak.
     */
    removeExpiredItems() {
        return this.driver.removeExpiredItems();
    }

    /*
    Remove all cached items.
     */
    cleanUp() {
        return this.driver.cleanUp();
    }

    /*
    Return all cached keys.
     */
    keys() {
        return this.driver.cachedItemsWithoutPrefix();
    }

    /**
     * @returns {*}
     */
    getDriver() {
        return this.driver;
    }
}
