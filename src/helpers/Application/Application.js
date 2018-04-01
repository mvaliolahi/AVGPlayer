/**
 * Application class, This class will be removed
 * when i replace it with redux store.
 */
export class Application {

    /**
     * Dynamic data.
     *
     * @type array
     */
    static data = null;

    /**
     *
     * @returns {Array}
     * @constructor
     */
    static AppData() {
        return this.data;
    }

    /**
     * Set Dynamic data.
     *
     * @param data
     */
    static setAppData(data) {
        this.data = data;
    }
}