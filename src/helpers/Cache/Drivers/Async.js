import {AsyncStorage} from "react-native";

export class Async {

    /*
    Cache key prefix to distinguish at cleanup time.
     */
    prefix = null;

    /*
    Async Driver constructor.
     */
    constructor(config) {
        this.prefix = config.prefix;
    }

    /*
    Store data in cache permanently.
     */
    async set(key, value, second = null) {
        return await AsyncStorage.setItem(this.prefixFor(key), this.storedAs(value, second));
    }

    /*
    Retrieve data from cache.
     */
    async get(key) {
        let item = JSON.parse(await AsyncStorage.getItem(this.prefixFor(key)));

        return this.retrieveDataIfIsNotExpired(this.prefixFor(key), item);
    }

    /*
    Remove data from cache.
     */
    async forget(key) {
        await AsyncStorage.removeItem(this.prefixFor(key));
        return this.has(key);
    }

    /*
    Check if data was cached retrieve it or generate it using callback.
     */
    async remember(key, callback, second = null) {
        if (await this.has(key)) {
            const result = await this.get(key);
            return (result === null) ? callback() : result;
        }

        await this.set(key, callback, second);

        return callback();
    }

    /*
    Check data is cached before that.
     */
    async has(key) {
        const item = await this.get(key);

        return !(item === {} || item === null);
    }

    /*
    Get current time.
     */
    time(add = 0) {
        return Math.floor(Date.now() / 1000) + add;
    }

    /*
    This method should call after set, or get item.
     */
    async removeExpiredItems() {
        const CachedItems = await this.readAllCachedItemsFromAsyncStorage();

        CachedItems.map(async (item) => {
            const cachedValue = await AsyncStorage.getItem(item);
            if (this.isItemExpired(JSON.parse(cachedValue))) {
                await AsyncStorage.removeItem(item);
            }
        });
    }

    async cachedItemsWithoutPrefix() {
        const AllAsyncStorageKeys = await AsyncStorage.getAllKeys();

        if (AllAsyncStorageKeys !== null) {
            const output = [];
            AllAsyncStorageKeys.filter((item) => {
                if (this.isItemStoredAsCache(item)) {
                    const tmp = item.split(':');
                    output.push(tmp[1]);
                }
            });

            return output;
        }
    }

    /*
    Remove all cached items.
     */
    async cleanUp() {
        const keys = await this.readAllCachedItemsFromAsyncStorage();
        if (keys.length > 0) {
            await AsyncStorage.multiRemove(keys, async (error) => {
                if (error === null) {
                    return true;
                }
                return value;
            });
        }
    }

    async readAllCachedItemsFromAsyncStorage() {
        const AllAsyncStorageKeys = await AsyncStorage.getAllKeys();
        if (AllAsyncStorageKeys !== null) {
            return AllAsyncStorageKeys.filter((item) => {
                if (this.isItemStoredAsCache(item)) {
                    return item;
                }
            });
        }
    }

    /*
    Check if data was expired remove it and return null.
     */
    async retrieveDataIfIsNotExpired(key, item) {
        if (item == null) {
            return null;
        }

        if (this.isItemExpired(item)) {
            await AsyncStorage.removeItem(key);
            return {};
        }

        return item.value;
    }

    /*
    Check if stored item is expired return true.
     */
    isItemExpired(item) {
        return item.expired_at !== null && item.expired_at < this.time();
    }

    /*
    General format for cached data.
    */
    storedAs(value, second) {

        if (value instanceof Function) {
            value = value();
        }

        return JSON.stringify({
            "value": value,
            "expired_at": (second !== null) ? this.time(second) : null,
        });
    }

    /*
    Add prefix to keys, to detect entry keys as they stored.
     */
    prefixFor(key) {
        return `${this.prefix}:${key}`;
    }

    /*
    Check if key in AsyncStorage start with our prefix we find that,
    Item is cached using out class.
     */
    isItemStoredAsCache(item) {
        let x = item.split(':');
        return x[0] === this.prefix;
    }
}
