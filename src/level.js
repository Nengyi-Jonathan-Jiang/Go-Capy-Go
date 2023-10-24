class Level {
    /**
     * @param {HTMLImageElement} background
     * @param {(level: Level, player: GameObject, berry: GameObject)=>any} onRestart
     * @param {(level: Level)=>any} [onLoad]
     * @param {(level: Level)=>any} [onUpdate]
     */
    constructor(background, onRestart, onLoad, onUpdate) {
        this.background = background;
        this.engine = new GameEngine();
        this.recorders = [new ShadowRecorder(), new ShadowRecorder(), new ShadowRecorder()];

        this.generate = onRestart ?? (() => {});
        this.onLoad = onLoad ?? (() => {});
        this.onUpdate = onUpdate ?? (() => {});

        this.player = new PlayerObject();
        this.berry = new BerryObject(0, 0);

        this.reset();
    }

    get recorder (){
        return this.recorders[2];
    }

    get recordings() {
        return this.recorders.slice(0, 2);
    }

    reset() {
        this.recorders.forEach(i => i.reset());
        this.engine.remove(...this.engine.gameObjects);
        this.onLoad(this);
        this.persistentObjects = this.engine.gameObjects;
        this.isWon = false;
        this.restart();
    }

    regenerateLevel(){
        const {engine} = this;
        engine.remove(...engine.gameObjects.filter(i => !this.persistentObjects.includes(i)));
        this.player.position = new Vec2(1.5, 7.5);
        this.berry.position = new Vec2(14.5, 7.5);
        engine.add(new PlatformObject(0, 0, 16, 1));
        engine.add(new PlatformObject(0, 8, 16, 1));
        engine.add(new PlatformObject(0, 0, 1, 16));
        engine.add(new PlatformObject(15, 0, 1, 16));
        this.generate(this, this.player, this.berry);
        engine.add(this.berry, this.player);
    }

    restart (){
        this.recorder.stopRecording();
        this.regenerateLevel();

        this.recorders.push(this.recorders.shift());


        this.recorder.startRecording(this.engine);
        for(let i = 0; i < 2; i++){
            this.recordings[i].startPlayback(obj => {
                if(obj instanceof PlayerObject){
                    obj = new ShadowPlayerObject(i);
                    obj.collisionLayer = 2;
                }
                else obj.collisionLayer = 1;

                let oldDraw = obj.draw;
                obj.draw = ctx => {
                    ctx.globalAlpha = 0.5;
                    oldDraw.call(obj, ctx);
                    ctx.globalAlpha = 1;
                }

                return obj;
            });
        }
    }

    addPlatformAt(x, y, w, h) {
        this.engine.add(new PlatformObject(x, y, w, h));
    }

    addPumpkinAt(x, y) {
        this.engine.add(new PumpkinObject(x, y));
    }

    addBoxAt(x, y) {
        this.engine.add(new BoxObject(x, y));
    }

    /**
     * @param {Renderer} renderer
     */
    updateAndRender(renderer) {
        this.recorders.forEach(i => i.update());
        this.engine.update();
        renderer.render(this.engine, this.background);

        if(events.keysDown['a']){
            this.player.move(-1)
        }
        else if(events.keysDown['d']){
            this.player.move(1)
        }
        else this.player.move(0);

        if(events.keysDown[' ']){
            this.player.tryJump(this.engine);
        }

        for(let obj of this.engine.gameObjects.filter(i => this.player.isCollidingWith(i))) {
            if(obj instanceof PumpkinObject) {
                this.engine.remove(obj);
                this.restart();
            }
            else if(obj instanceof BerryObject) {
                this.isWon = true;
            }
        }

        this.onUpdate(this);
    }

    get isLevelCleared() {
        return this.isWon;
    }
}