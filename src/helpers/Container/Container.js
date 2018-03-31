export class Container {

    /**
     * All available dependencies inside service-container.
     *
     * @type {Array}
     */
    static dependencies = [];

    /**
     * Bind new dependency.
     *
     * @param key
     * @param callback
     * @returns {*}
     */
    static bind(key, callback) {
        return this.dependencies[key] = callback;
    }

    /**
     * This function pick dependency from container and if it was a callback,
     * then return a resolved version.
     *
     * @param key
     * @returns {*}
     */
    static make(key) {
        //TODO:: check for exists.
        const dependency = this.dependencies[key];

        if (typeof dependency === "function") {
            return dependency();
        }

        return dependency;
    }

    /**
     * Pick item from container.
     *
     * @param key
     * @returns {*}
     */
    static get(key) {
        //TODO:: check for exists.
        return this.dependencies[key];
    }
}