class BerryObject extends GameObject {
    static image = document.getElementById('berry-img');

    /**
     * @param {number} x
     * @param {number} y
     */
    constructor(x, y) {
        super(new Vec2(0.8, 0.8), BerryObject.image, {isStatic: true});
        this.position = new Vec2(x, y);
        this.collisionLayer = 31;
    }

    draw(ctx) {
        let dy = Math.sin(Date.now() / 500) * 0.05;
        ctx.translate(0, dy)
        super.draw(ctx);
    }
}


class PlatformObject extends GameObject {
    /**
     * @param {number} x
     * @param {number} y
     * @param sx
     * @param sy
     */
    constructor(x, y, sx=1, sy=1) {
        super(new Vec2(sx, sy), null, {isStatic: true, friction: 0.1});
        this.position = new Vec2(x + sx/2, y + sy/2);
    }

    draw(ctx){
        ctx.fillStyle = "#4cf";
        ctx.fillRect(-0.5, -0.5, 1.0, 1.0);
    }
}


class BoxObject extends GameObject {
    static image = document.getElementById('box-img');

    /**
     * @param {number} x
     * @param {number} y
     */
    constructor(x, y) {
        super(new Vec2(1, 1), BoxObject.image);
        Matter.Body.setMass(this.body, 0.01);
        this.position = new Vec2(x, y);
        this.collisionMask = [0];
    }
}


class PumpkinObject extends GameObject {
    static image = document.getElementById('pump-img');

    /**
     * @param {number} x
     * @param {number} y
     */
    constructor(x, y) {
        super(new Vec2(1, 1.2), PumpkinObject.image, {isStatic: true});
        this.body.isSensor = true;
        this.position = new Vec2(x, y);
    }

    draw(ctx) {
        ctx.globalAlpha = Math.sin(Date.now() / 200) * 0.2 + 0.6;
        super.draw(ctx);
        ctx.globalAlpha = 1;
    }
}


class DoorObject extends GameObject {
    open_progress = 0;
    initial_height; initial_y;
    color;

    /**
     * @param {number} x
     * @param {number} y
     * @param {number} sx
     * @param {number} sy
     * @param {string} color
     */
    constructor(x, y, sx, sy, color) {
        super(new Vec2(sx, sy), null, {isStatic: true, friction: 0.1});
        this.color = color;
        this.position = new Vec2(x, y);
        this.initial_height = sy;
        this.initial_y = y;
        /** @type {ButtonObject[]} */
        this.linked_buttons = [];
    }

    /** @param {ButtonObject} button */
    link(button) { this.linked_buttons.push(button); button.color = this.color }

    update(engine, deltaTime) {
        let shouldOpen = !this.linked_buttons.find(i => !i.isPressed);
        if(shouldOpen) {
            this.open_progress = Math.min(this.open_progress + deltaTime * 0.005 / Math.abs(this.initial_height), 1);
        }
        else {
            this.open_progress = Math.max(this.open_progress - deltaTime * 0.005 / Math.abs(this.initial_height), 0);
        }
        if(this.open_progress === 1){
            this.y = 1000;
        }
        else {
            let h = this.initial_height * (1 - (this.open_progress));
            let y = this.initial_y - this.initial_height / 2 + h / 2;

            this.size = this.size.setY(h);
            this.y = y;
        }
    }

    draw(ctx){
        ctx.fillStyle = this.color;
        ctx.fillRect(-0.51, -0.51, 1.02, 1.02);
    }
}


class ButtonObject extends GameObject {
    static image = document.getElementById('button-neutral-img');
    static image_pressed = document.getElementById('button-pressed-img');

    /** @type {GameEngine} */
    engine;

    /**
     * @param {number} x
     * @param {number} y
     * @param {GameEngine} engine
     */
    constructor(x, y, engine) {
        super(new Vec2(0.8, 0.15), ButtonObject.image_pressed, {isStatic: true});
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
        return this.engine.gameObjects.find(i =>
            i !== this &&
                (i instanceof BoxObject || i instanceof PlayerObject || i instanceof ShadowPlayerObject)
            && this.isCollidingWith(i)
        );
    }
}