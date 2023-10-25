class PlayerObject extends GameObject {
    static image = document.getElementById('capy-img');
    static PLAYER_SPEED = .05;
    static PLAYER_JUMP_SPEED = 0.19;

    constructor() {
        super(new Vec2(1, 0.85), PlayerObject.image, {isStatic: false, friction: 0});
        this.facing = 1;
        this.collisionMask = [0, 1];

        this.sensor = new GameObject(new Vec2(0.9, .01), null);
    }

    /** @param {GameEngine} engine */
    isGrounded(engine) {
        this.sensor.position = this.position.plus(new Vec2(0, 0.425));
        return engine.gameObjects.find(i =>
            i !== this && this.collisionMask.includes(i.collisionLayer) && this.sensor.isCollidingWith(i)
        );
    }

    move(direction) {
        this.vx = direction * PlayerObject.PLAYER_SPEED;
        if (direction !== 0) this.facing = direction;
        this.position = this.position.plus(new Vec2(direction * 0.001, 0));
    }

    /** @param {GameEngine} engine */
    tryJump(engine) {
        if(this.isGrounded(engine)){
            this.vy = -PlayerObject.PLAYER_JUMP_SPEED;
        }
    }

    draw(ctx) {
        ctx.scale(this.facing, 1);
        super.draw(ctx);
    }
}

class ShadowPlayerObject extends GameObject {
    static image = [
        document.getElementById('guinea-img'),
        document.getElementById('mara-img')
    ];

    constructor(i) {
        super(new Vec2(1, 0.85), ShadowPlayerObject.image[i], {isStatic: false, friction: 0});
    }

    lx = 0;
    facing = 1;

    draw(ctx) {
        let facing = this.x - this.lx;
        this.lx = this.x;
        if (facing !== 0) this.facing = Math.sign(facing);
        ctx.scale(this.facing, 1);
        super.draw(ctx);
    }
}