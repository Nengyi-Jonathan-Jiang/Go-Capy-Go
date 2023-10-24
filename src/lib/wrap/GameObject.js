class GameObject {
    static get __ENGINE_SCALE(){ return 10 };

    #body; #size; #image;
    #collisionLayer;
    #collisionMask;

    /**
     * @param {Vec2} size
     * @param {HTMLImageElement} [image]
     * @param {{
     *     isStatic?: boolean,
     *     friction?: number
     * }|null} [options]
     */
    constructor(size, image, options = null) {
        const {isStatic, friction} = {...{
            isStatic:false,
            friction:0,
            rotation: false
        }, ...options};
        this.#body = Matter.Bodies.rectangle(0, 0, size.x * GameObject.__ENGINE_SCALE, size.y * GameObject.__ENGINE_SCALE, {
            isStatic,
            friction: friction,
            frictionStatic: friction,
            frictionAir: 0,
            inertia: Number.POSITIVE_INFINITY,
            restitution: 0,
            slop: 0.002
        });
        this.#body.gameObject = this;
        this.#size = size;
        this.#image = image ?? null;

        this.position = Vec2.zero;
        this.velocity = Vec2.zero;
        this.rotation = 0;
        this.angularVelocity = 0;
        this.collisionLayer = 0;
    }

    /** @param {HTMLImageElement} image */
    set image(image) {
        this.#image = image ?? this.#image ?? null;
    }

    /** @type {Vec2} */
    get position() { return Vec2.copy(this.#body.position).times(1 / GameObject.__ENGINE_SCALE) }
    /** @param {Vec2} pos */
    set position(pos) { Matter.Body.setPosition(this.#body, Vec2.copy(pos).times(GameObject.__ENGINE_SCALE)) }

    get x() { return this.position.x }
    get y() { return this.position.y }
    set x(x) { this.position = this.position.setX(x) }
    set y(y) { this.position = this.position.setY(y) }

    /** @type {Vec2} */
    get velocity() { return Vec2.copy(Matter.Body.getVelocity(this.#body)).times(1 / GameObject.__ENGINE_SCALE) }
    /** @param {Vec2} v */
    set velocity(v) { Matter.Body.setVelocity(this.#body, v.times(GameObject.__ENGINE_SCALE)) }

    get vx() { return this.velocity.x }
    get vy() { return this.velocity.y }
    set vx(x) { this.velocity = this.velocity.setX(x) }
    set vy(y) { this.velocity = this.velocity.setY(y) }

    /** @param {Vec2} f */
    addForce(f) { Matter.Body.applyForce(this.#body, this.#body.position, f.times(GameObject.__ENGINE_SCALE)) }
    /** @param {Vec2} f */
    set force(f) { this.#body.force = Vec2.copy(f.times(GameObject.__ENGINE_SCALE)) }

    /** @type {number} */
    get rotation() { return this.#body.angle }
    /** @param {number} angle */
    set rotation(angle) { Matter.Body.setAngle(this.#body, angle, false) }
    /** @type {number} */
    get angularVelocity() { return this.#body.angularVelocity }
    /** @param {number} omega */
    set angularVelocity(omega) { Matter.Body.setAngularVelocity(this.#body, omega) }

    /** @type {Vec2} */
    get size() { return Vec2.copy(this.#size) }
    /** @param {Vec2} size */
    set size(size) { Matter.Body.setVertices(this.body,
        [
            size.componentTimes(-0.5, -0.5).times(GameObject.__ENGINE_SCALE),
            size.componentTimes(-0.5, 0.5).times(GameObject.__ENGINE_SCALE),
            size.componentTimes(0.5, 0.5).times(GameObject.__ENGINE_SCALE),
            size.componentTimes(0.5, -0.5).times(GameObject.__ENGINE_SCALE),
        ]
    ); this.#size = Vec2.copy(size) }
    /** @type {HTMLImageElement} */
    get image(){ return this.#image }

    get body() { return this.#body }

    /** @param {CanvasRenderingContext2D} ctx */
    draw(ctx){
        ctx.drawImage(this.image, -0.5, -0.5, 1, 1);
    }

    /**
     * @param {GameEngine} engine
     * @param {number} deltaTime
     */
    update(engine, deltaTime){}


    clone() {
        const clonedBody = structuredClone(this.#body);
        const newObj = new GameObject(Vec2.copy(this.#size), this.#image);
        Object.assign(newObj, this);
        Object.setPrototypeOf(newObj, Object.getPrototypeOf(this));
        clonedBody.gameObject = newObj;
        newObj.#body = clonedBody;
        return newObj;
    }

    makeStatic() {
        this.body.isStatic = true;
    }
    makeNotStatic() {
        this.body.isStatic = false;
    }

    get isStatic() {
        return this.body.isStatic;
    }

    /**
     * @param {number} layer A number from 1 to 32
     */
    set collisionLayer(layer) {
        this.body.collisionFilter.category = (1 << layer);
        this.#collisionLayer = layer;
    }

    /** @type {number} */
    get collisionLayer() { return this.#collisionLayer }

    /** @param {number[]} layers The layers to collide with */
    set collisionMask(layers) {
        this.body.collisionFilter.mask = layers.map(i => 1 << i).reduce((a, b) => a | b, 0);
        this.#collisionMask = layers;
    }

    /** @type {number[]} */
    get collisionMask() { return this.#collisionMask }

    /** @param {GameObject} other */
    isCollidingWith(other) {
        return Matter.Bounds.overlaps(this.body.bounds, other.body.bounds);
    }
}