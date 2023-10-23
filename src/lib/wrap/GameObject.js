class GameObject {
    #body; #size; #image;

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
            friction:0
        }, ...options};
        this.#body = Matter.Bodies.rectangle(0, 0, size.x * 100, size.y * 100, {
            isStatic,
            friction: friction,
            frictionStatic: friction,
            inertia: Number.POSITIVE_INFINITY
        });
        this.#body.gameObject = this;
        this.#size = size;
        this.#image = image ?? null;

        this.position = Vec2.zero;
        this.velocity = Vec2.zero;
        this.rotation = 0;
        this.angularVelocity = 0;
    }

    /** @type {Vec2} */
    get position() { return Vec2.copy(this.#body.position).times(.01) }
    /** @param {Vec2} pos */
    set position(pos) { Matter.Body.setPosition(this.#body, Vec2.copy(pos).times(100).plainObject) }

    get x() { return this.position.x }
    get y() { return this.position.y }
    set x(x) { this.position = this.position.setX(x) }
    set y(y) { this.position = this.position.setY(y) }

    /** @type {Vec2} */
    get velocity() { return Vec2.copy(Matter.Body.getVelocity(this.#body)).times(.01) }
    /** @param {Vec2} v */
    set velocity(v) { Matter.Body.setVelocity(this.#body, v.times(100).plainObject) }

    get vx() { return this.velocity.x }
    get vy() { return this.velocity.y }
    set vx(x) { this.velocity = this.velocity.setX(x) }
    set vy(y) { this.velocity = this.velocity.setY(y) }

    /** @param {Vec2} f */
    addForce(f) { Matter.Body.applyForce(this.#body, this.#body.position, f) }
    /** @param {Vec2} f */
    set force(f) { this.#body.force = Vec2.copy(f) }

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
    /** @type {HTMLImageElement} */
    get image(){ return this.#image }

    get body() { return this.#body }

    /** @param {CanvasRenderingContext2D} ctx */
    draw(ctx){
        ctx.drawImage(this.image, -0.5, -0.5, 1, 1);
    }


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

    setCollisionLayer() {

    }
    setCollisionMask() {

    }
}