export default class Event {
    // ATTRIBUTES
    #name;
    #z;
    #priority;
    #object;

    // CONSTRUCTOR
    constructor(name, z, priority, object) {
        this.#name = name;
        this.#z = z;
        this.#priority = priority,
        this.#object = object
    }

    // GETTERS
    get name() {
        return this.#name;
    }

    get z() {
        return this.#z;
    }

    get priority() {
        return this.#priority;
    }

    get object() {
        return this.#object;
    }

    // METHODS
    expose() {
        console.log(`Event: ${this.#name} - ${this.#object}
        Priority ${this.#priority} / Stack: ${this.#z}`);
        return;
    }
}