class PlayerObject extends GameObject {
    static image = document.getElementById('guinea-img');
    static PLAYER_SPEED = .05;

    constructor() {
        super(1, new Vec2(.75, 0.5), PlayerObject.image, {isStatic: false, friction: 0});
        this.facing = 1;
    }

    move(direction){
        this.vx = direction * PlayerObject.PLAYER_SPEED;
        if(direction !== 0) this.facing = direction;
        this.position = this.position.plus(new Vec2(direction * 0.001, 0));
    }

    tryJump() {

    }

    draw(ctx) {
        ctx.scale(this.facing, 1);
        super.draw(ctx);
    }
}

class PlatformObject extends GameObject {
    static image = document.getElementById('box-img');

    /**
     * @param {number} x
     * @param {number} y
     * @param sx
     * @param sy
     */
    constructor(x, y, sx=1, sy=1) {
        super(1, new Vec2(sx, sy), null, {isStatic: true, friction: 0.1});
        this.position = new Vec2(x + sx/2, y + sy/2);
    }

    draw(ctx){
        ctx.fillStyle = "#fac";
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
        super(1, new Vec2(1, 1), BoxObject.image);
        this.position = new Vec2(x, y);
    }
}

class PumpkinObject extends GameObject {
    static image = document.getElementById('pump-img');

    /**
     * @param {number} x
     * @param {number} y
     */
    constructor(x, y) {
        super(1, new Vec2(1, 0.8), PumpkinObject.image, {isStatic: true});
        this.body.isSensor = true;
        this.position = new Vec2(x, y);
    }

    draw(ctx) {
        ctx.globalAlpha = Math.sin(Date.now() / 200) * 0.2 + 0.6;
        super.draw(ctx);
        ctx.globalAlpha = 1;
    }
}