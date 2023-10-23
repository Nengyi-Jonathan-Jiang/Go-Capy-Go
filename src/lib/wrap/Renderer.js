class Renderer {
    /** @param {HTMLCanvasElement} canvasEl */
    constructor(canvasEl) {
        this.canvas = canvasEl;
        this.ctx = canvasEl.getContext('2d');
        this.scale = new Vec2(32, 18);
    }

    resize() {
        this.ctx.setTransform(
            (this.canvas.width = this.canvas.clientWidth) / this.scale.x, 0, 0,
            (this.canvas.height = this.canvas.clientHeight) / this.scale.y, 0, 0
        )
    }

    /** @param {GameEngine} engine */
    render(engine){
        const ctx = this.ctx;
        ctx.clearRect(0, 0, ...this.scale);
        for(let gameObject of engine.gameObjects){
            ctx.save();
            ctx.translate(gameObject.position.x, gameObject.position.y);
            ctx.rotate(gameObject.rotation);
            ctx.scale(gameObject.size.x, gameObject.size.y)

            gameObject.draw(ctx);
            ctx.restore();
        }
    }
}