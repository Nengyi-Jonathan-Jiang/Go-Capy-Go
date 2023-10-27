class LevelRunner {
    /** @type {boolean} */ #isCurrentLevelWon = false;
    /** @type {boolean} */ #isCurrentLevelEnded = false;
    /** @type {Level} */ #currentlyRunningLevel = null;
    /** @type {Renderer} */ #renderer;

    /** @param {Renderer} renderer */
    constructor(renderer) {
        this.#renderer = renderer;
    }

    /** @param {Level} level */
    runLevel(level) {
        this.#currentlyRunningLevel = level;
        this.#isCurrentLevelEnded = false;
        this.#isCurrentLevelWon = false;
        return new Promise(resolve => {

            const frame = () => {
                this.#currentlyRunningLevel.update();
                this.#currentlyRunningLevel.render(renderer);
                if (level.isWon) {
                    this.#isCurrentLevelWon = true;
                    this.#currentlyRunningLevel = null;
                }

                requestAnimationFrame(frame);
            }
            requestAnimationFrame(frame);
        })
    }

    get currentLevel (){
        return this.#currentlyRunningLevel;
    }

    get isWon() {
        return this.#isCurrentLevelWon;
    }

    abortLevel() {
        this.#isCurrentLevelEnded = true;
    }
}