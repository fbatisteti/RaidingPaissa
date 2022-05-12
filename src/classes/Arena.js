export default class Arena {
    // ATTRIBUTES
    #width;
    #height;
    #isRound; // bool
    #walls; // 'normal', 'none', 'death'

    // CONSTRUCTOR
    constructor(width, height, isRound, walls) {
        this.#width = width;
        this.#height = height;
        this.#isRound = isRound;
        this.#walls = walls;
    }

    // GETTERS
    get width() {
        return this.#width;
    }

    get height() {
        return this.#height;
    }

    get isRound() {
        return this.#isRound;
    }

    get walls() {
        return this.#walls
    }

    // METHODS
    expose() {
        console.log(`Arena created.
        ${this.#width} x ${this.#height}
        ${this.#isRound ? 'Round' : 'Rectangular'}
        ${(this.#walls === 'death') ?
            'Death walls' :
            (this.#walls === 'none') ?
                'No walls' :
                'Normal walls'}`);
        return 0;
    }
}