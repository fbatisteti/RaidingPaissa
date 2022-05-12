export default class Boss {
    // ATTRIBUTES
    #name;
    #size;
    #x;
    #y;
    #omni; // bool

    // CONSTRUCTOR
    constructor(name, size, x, y, omni) {
        this.#name = name;
        this.#size = size;
        this.#x = x;
        this.#y = y;
        this.#omni = omni;
    }

    // GETTERS
    get name() {
        return this.#name;
    }

    get size() {
        return this.#size;
    }

    get x() {
        return this.#x;
    }

    get y() {
        return this.#y;
    }

    get omni() {
        return this.#omni;
    }

    // METHODS
    expose() {
        console.log(`Boss: ${this.#name} (${this.#size}, ${this.#omni ? '[omnidirectional]' : ''})
        Positioned at ${this.#x}x${this.#y}`);
        return 0;
    }
}