import Event from "./Event" 

export default class Timeframe {
    // ATTRIBUTES
    #id;
    #components;

    // CONSTRUCTOR
    constructor(id) {
        this.#id = id;
        this.#components = [];
    }

    // GETTERS
    get id() {
        return this.#id;
    }

    get component() {
        return this.#components;
    }

    // METHODS
    expose() {
        let min = Math.floor(this.#id / 60);
        let sec = this.#id - min * 60;

        console.log(`Time Frame: ${this.#id} (${min}min ${sec}sec)`);
        
        for (let i = 0; i < this.#components.length; i++) {
            console.log(this.#components[i].expose());
        }

        return;
    }
}