class ShadowRecorderFrame {
    /** @param {GameObject} gameObject */
    constructor(gameObject) {
        /** @type {Vec2} */
        this.pos = gameObject.position;
        /** @type {Vec2} */
        this.vel = gameObject.velocity;
    }

    /** @param {GameObject} gameObject */
    apply(gameObject) {
        gameObject.position = this.pos;
    }
}

class ShadowRecorder {
    /** @type {GameObject[]} */ #gameObjects = [];
    /** @type {GameObject[]} */ #shadowGameObjects = [];
    /** @type {ShadowRecorderFrame[][]} */ #frames = [];
    /** @type {number} */ #currFrameIndex = 0;
    /** @type {boolean} */ #recording = false;
    /** @type {boolean} */ #hasRecording = false;
    /** @type {boolean} */ #playing = false;
    /** @type {GameEngine} engine */ #engine;

    constructor() {}

    /** @param {GameEngine} engine */
    startRecording(engine) {
        this.reset();
        this.#gameObjects = [...engine.gameObjects.filter(i => !i.isStatic)];
        this.#recording = this.#hasRecording = true;
        this.#engine = engine;
    }

    update(){
        if(this.#recording) {
            this.#frames.push(this.#gameObjects.map(i => new ShadowRecorderFrame(i)))
        }
        if(this.#playing) {
            if(this.#currFrameIndex >= this.#frames.length) {
                this.#playing = false;
                this.#engine.remove(...this.#shadowGameObjects);
            }
            else {
                let currFrame = this.#frames[this.#currFrameIndex++];
                for(let i = 0; i < this.#shadowGameObjects.length; i++){
                    currFrame[i].apply(this.#shadowGameObjects[i]);
                }
            }
        }
    }

    stopRecording() {
        this.#recording = false;
    }

    get gameObjects() {
        return this.#gameObjects;
    }

    /** @param {(GameObject)=>GameObject} f */
    startPlayback(f=(i=>i)){
        if(!this.#hasRecording) return;
        this.#playing = true;
        this.#shadowGameObjects = this.#gameObjects.map(i => i.clone()).map(f);
        this.#shadowGameObjects.forEach(i => i.isStatic = true);

        this.restartPlayback();
    }

    restartPlayback(){
        if(!this.#hasRecording) return;
        this.#engine.remove(...this.#shadowGameObjects);
        this.#engine.add(...this.#shadowGameObjects);
        this.#currFrameIndex = 0;
    }

    reset() {
        this.#currFrameIndex = 0;
        this.#frames = []

        if(this.#engine && this.#shadowGameObjects) {
            this.#engine.remove(...this.#shadowGameObjects);
        }

        this.#gameObjects = this.#shadowGameObjects = null;
        this.#playing = this.#recording = this.#hasRecording = false;
    }

    get hasRecording() {
        return this.#hasRecording;
    }

    get isRecording() {
        return this.#recording
    }

    get isPlaying() {
        return this.#playing
    }
}