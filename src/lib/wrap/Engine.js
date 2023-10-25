class GameEngine {
    #engine;
    static STEP_RESOLUTION = 6;

    constructor() {
        const engine = this.#engine = Matter.Engine.create();
        engine.gravity.scale = .003 / GameObject.__ENGINE_SCALE;
        engine.positionIterations *= 2;
        engine.velocityIterations *= 2;
    }

    update(deltaTime = 16.6666666) {
        for(let i = 0; i < GameEngine.STEP_RESOLUTION; i++){
            Matter.Engine.update(this.#engine, deltaTime / GameEngine.STEP_RESOLUTION);
            this.gameObjects.forEach(i => i.update(this, deltaTime / GameEngine.STEP_RESOLUTION));
        }
    }

    /** @param {GameObject} objects */
    add(...objects) {
        Matter.Composite.add(this.#engine.world, objects.map(i => i.body));
    }

    /** @param {GameObject} objects */
    remove(...objects){
        objects.forEach(i => Matter.Composite.removeBody(this.world, i.body, true));
    }

    /** @type {GameObject[]} */
    get gameObjects() {
        return Matter.Composite.allBodies(this.#engine.world).map(i => i.gameObject);
    }

    get engine() {
        return this.#engine;
    }
    get world() {
        return this.#engine.world;
    }
}