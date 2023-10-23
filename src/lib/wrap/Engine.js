class GameEngine {
    #engine;

    constructor() {
        const engine = this.#engine = Matter.Engine.create();
        engine.gravity.scale = .003 / GameObject.__ENGINE_SCALE;
    }

    update(deltaTime=16.6666) {
        Matter.Engine.update(this.#engine, deltaTime);
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