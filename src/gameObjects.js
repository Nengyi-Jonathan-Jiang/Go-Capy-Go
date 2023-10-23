class PlayerObject extends GameObject {
    static image = document.getElementById('capy-img');
    static PLAYER_SPEED = .05;
    static PLAYER_JUMP_SPEED = .21;

    constructor() {
        super(1, new Vec2(2, 1.7), PlayerObject.image, {isStatic: false});
        this.facing = 1;
    }

    move(direction){
        this.vx = direction * PlayerObject.PLAYER_SPEED;
        if(direction !== 0) this.facing = direction;
        this.position = this.position.plus(new Vec2(direction * 0.001, 0));
    }

    tryJump() {
        if(Math.abs(this.vy) < 0.1) this.vy = -PlayerObject.PLAYER_JUMP_SPEED
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
        super(1, new Vec2(2, 2), BoxObject.image);
        this.position = new Vec2(x, y);
    }
}