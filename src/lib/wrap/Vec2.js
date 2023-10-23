
/**
 * @typedef {[T, T]} Pair
 * @template T
 */

class Vec2 {
    /**
     * @param {number} x
     * @param {number} y
     */
    constructor(x, y) {
        this[0] = x;
        this[1] = y;
    }

    /** @param {{x:number,y:number}} vec2like */
    static copy(vec2like){ return new Vec2(vec2like.x, vec2like.y) }
    /**
     * @param {number} x
     * @param {number} y
     */
    static fromArray([x, y]){ return new Vec2(x, y) }

    get plainObject() { return {x: this[0], y: this[1] }}

    /** @type {number} */
    get x() { return this[0] }
    /** @param {number} x */
    set x(x) { this[0] = x }

    /** @type {number} */
    get y() { return this[1] }
    /** @param {number} y */
    set y(y) { this[1] = y }

    /** @param {number} x */
    setX(x) { return new Vec2(x, this.y) }
    /** @param {number} y */
    setY(y) { return new Vec2(this.x, y) }

    /** @param {Vec2} other */
    plus(other) { return new Vec2(this.x + other.x, this.y + other.y) }

    /** @param {number} s */
    times(s) { return new Vec2(this.x * s, this.y * s) }

    [Symbol.iterator]() { return [this.x, this.y][Symbol.iterator]() }

    static get zero() { return new Vec2(0, 0) }
}
