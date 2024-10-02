class Renderer {
    /** @type {Vec2} */
    static get scale() {
        return new Vec2(16, 9);
    }

    /** @param {HTMLCanvasElement} canvasEl */
    constructor(canvasEl) {
        this.canvas = canvasEl;
        this.ctx = canvasEl.getContext('2d');
        /** @type {Vec2} */
        this.scale = Renderer.scale;
    }

    resize() {
        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;
    }

    /** @param {GameEngine} engine
     * @param {HTMLImageElement} background
     * @param {Vec2} [cameraPosition]
     * @param {Vec2} [levelSize]
     */
    render(engine, background = null, cameraPosition = new Vec2(0, 0), levelSize=Renderer.scale) {
        this.resize();
        const ctx = this.ctx;
        ctx.setTransform(
            this.canvas.width / this.scale.x, 0, 0,
            this.canvas.height / this.scale.y, 0, 0
        );

        const offset = cameraPosition.times(-1).plus(Renderer.scale.times(0.5));

        ctx.clearRect(0, 0, ...this.scale);
        if (background !== null) {
            ctx.drawImage(
                background,
                ...offset,
                ...levelSize
            );
        }
        for (let gameObject of engine.gameObjects.toSorted(
            (a, b) => a.zIndex - b.zIndex
        )) {
            ctx.save();
            ctx.translate(...gameObject.position.plus(
                offset
            ));
            ctx.rotate(gameObject.rotation);
            ctx.scale(gameObject.size.x, gameObject.size.y)

            gameObject.draw(ctx);
            ctx.restore();
        }
    }
}