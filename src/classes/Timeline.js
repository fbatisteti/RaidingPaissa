import Timeframe from "./Timeframe";

export default class Timeline {
    // ATTRIBUTES
    size;
    frames;

    // CONSTRUCTOR
    constructor(framesTotal) {
        if (framesTotal < 1) framesTotal = 1;

        this.size = framesTotal;
        this.frames = new Array();

        for (let i = 0; i < framesTotal; i++) {
            this.frames.push(new Timeframe(i));
        }
    }

    // GETTERS
    get size() {
        return this.size;
    }

    get frames() {
        return this.frames;
    }

    // METHODS
    expose() {
        let min = Math.floor(this.size / 60);
        let sec = this.size - min * 60;

        console.log("==========");
        console.log(`Timeline: ${min}min ${sec}sec long`);

        for (let i = 0; i < this.size; i++) {
            console.log(this.frames[i].expose());
        }
        return;
    }
}