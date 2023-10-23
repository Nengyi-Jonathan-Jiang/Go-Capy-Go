class ShadowRecorder {
    /** @type {GameObject[]} */ #gameObjects = [];
    /** @type {GameObject[]} */ #shadowGameObjects = [];
    /** @type {Vec2[][]} */ #frames = [];
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
            this.#frames.push(this.#gameObjects.map(i => i.position))
        }
        if(this.#playing) {
            let currFrame = this.#frames[this.#currFrameIndex++];
            for(let i = 0; i < this.#shadowGameObjects.length; i++){
                this.#shadowGameObjects[i].position = currFrame[i];
            }
            if(this.#currFrameIndex >= this.#frames.length) {
                this.reset();
            }
        }
    }

    stopRecording() {
        this.#recording = false;
    }

    get gameObjects() {
        return this.#gameObjects;
    }

    /** @param {(GameObject)=>any} f */
    startPlayback(f=()=>{}){
        if(this.#playing || !this.#hasRecording) return;
        this.#playing = true;
        this.#shadowGameObjects = this.#gameObjects.map(i => i.clone());
        this.#shadowGameObjects.forEach(i => i.makeStatic());
        this.#shadowGameObjects.forEach(f);
        this.#engine.add(...this.#shadowGameObjects);
    }

    reset() {
        this.#currFrameIndex = 0;
        this.#frames = []

        if(this.#hasRecording) {
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