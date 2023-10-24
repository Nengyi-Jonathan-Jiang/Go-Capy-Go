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
        let dy = Math.sin(Date.now() / 1000) * 0.1;
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
        ctx.fillRect(-0.51, -0.51, 1.02, 1.02);
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
        super(new Vec2(1, 0.8), PumpkinObject.image, {isStatic: true});
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
    open = false;
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
        ctx.fillRect(-0.51, -0.51, 1.02, 1.02);
    }
}

class ButtonObject extends GameObject {
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
        let dy = Math.sin(Date.now() / 1000) * 0.1;
        ctx.translate(0, dy)
        super.draw(ctx);
    }
}