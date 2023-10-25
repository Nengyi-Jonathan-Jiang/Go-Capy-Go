class DoorManager extends GameObject {
    /** @type {string} */ color;
    /** @type {GameEngine} */ engine;

    /**
     * @param {string} color
     * @param {GameEngine} engine
     */
    constructor(color, engine) {
        super(Vec2.zero, null, {isStatic: true});
        this.color = color;
        this.engine = engine;
        this.collisionLayer = 31;
        /** @type {{door: DoorObject, inverted: boolean}[]} */
        this.linkedDoors = [];
        /** @type {{button: ButtonObject, inverted: boolean}[]} */
        this.linkedButtons = [];
    }

    /**
     * @param {DoorObject} door
     * @param inverted
     */
    linkDoor(door, inverted=false) {
        this.linkedDoors.push({door, inverted});
        door.color = this.color;
    }

    /**
     * @param {ButtonObject} button
     * @param inverted
     */
    linkButton(button, inverted=false){
        this.linkedButtons.push({button, inverted});
        button.color = this.color;
    }

    update(engine, deltaTime) {
        let conditionsMet = !this.linkedButtons.find(({button, inverted}) => button.isPressed === inverted);
        this.linkedDoors.forEach(({door, inverted}) => door.open = inverted !== conditionsMet);
    }
}

class ButtonObject extends GameObject {
    /** @type {GameEngine} */
    engine;

    /**
     * @param {number} x
     * @param {number} y
     * @param {GameEngine} engine
     */
    constructor(x, y, engine) {
        super(new Vec2(0.8, 0.2), null, {isStatic: true});
        this.engine = engine;
        this.position = new Vec2(x, y);
        this.collisionLayer = 31;
        this.color = '#f00'
    }

    draw(ctx) {
        if (!this.isPressed) {
            ctx.fillStyle = this.color;
            ctx.fillRect(-0.5, -0.5, 1, 0.5);
        }
        ctx.fillStyle = "#888";
        ctx.fillRect(-0.625, 0, 1.25, 0.5);
    }

    get isPressed() {
        return !!this.engine.gameObjects.find(i =>
            i !== this &&
            (i instanceof BoxObject || i instanceof PlayerObject || i instanceof ShadowPlayerObject)
            && this.isCollidingWith(i)
        );
    }
}

class DoorObject extends GameObject {
    #open_progress = 0;
    #initial_height;
    #initial_y;
    color; open = false;

    /**
     * @param {number} x
     * @param {number} y
     * @param {number} sx
     * @param {number} sy
     */
    constructor(x, y, sx, sy) {
        super(new Vec2(sx, sy), null, {isStatic: true, friction: 0.1});
        this.color = "#f00";
        this.position = new Vec2(x, y);
        this.#initial_height = sy;
        this.#initial_y = y;
    }

    update(engine, deltaTime) {
        if (this.open) {
            this.#open_progress = Math.min(this.#open_progress + deltaTime * 0.005 / Math.abs(this.#initial_height), 1);
        } else {
            this.#open_progress = Math.max(this.#open_progress - deltaTime * 0.005 / Math.abs(this.#initial_height), 0);
        }
        if (this.#open_progress === 1) {
            this.y = 1000;
        } else {
            let h = this.#initial_height * (1 - (this.#open_progress));
            let y = this.#initial_y - this.#initial_height / 2 + h / 2;

            this.size = this.size.setY(h);
            this.y = y;
        }
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(-0.5, -0.5, 1, 1);
    }
}