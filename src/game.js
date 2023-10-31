class Level {
    /**
     * @param {string} name
     * @param {HTMLImageElement} background
     * @param {(level: Level, player: GameObject, berry: GameObject)=>any} [onRestart]
     * @param {(level: Level)=>any} [onLoad]
     * @param {(level: Level)=>any} [onUpdate]
     */
    constructor(name, background, onRestart, onLoad, onUpdate) {
        this.name = name;
        this.background = background;
        this.engine = new GameEngine();
        this.recorders = [new ShadowRecorder(), new ShadowRecorder(), new ShadowRecorder()];

        this.generate = onRestart ?? (() => {});
        this.onLoad = onLoad ?? (() => {});
        this.onUpdate = onUpdate ?? (() => {});

        this.reset();
    }

    get currentRecorder (){
        return this.recorders[2];
    }

    get currentlyRunningRecordings() {
        return this.recorders.slice(0, 2);
    }

    reset() {
        this.recorders.forEach(i => i.reset());
        this.engine.remove(...this.engine.gameObjects);
        this.onLoad(this);
        this.volatileObjects = this.engine.gameObjects;
        this.isWon = false;
        this.player = new PlayerObject();
        this.berry = new BerryObject(0, 0);
        this.restartWithShadow();
    }

    resetPersistentLevelObjects(){
        const {engine} = this;
        engine.remove(...engine.gameObjects.filter(i => !this.volatileObjects.includes(i)));
        this.player.position = new Vec2(1.5, 7.575);
        this.berry.position = new Vec2(15.5, 7.5);
        engine.add(new PlatformObject(8, 0.5, 16, 1));
        engine.add(new PlatformObject(8, 8.5, 16, 1));
        engine.add(new PlatformObject(0.5, 4.5, 1, 9));
        engine.add(new PlatformObject(15.5, 3.5, 1, 7));
        this.generate(this, this.player, this.berry);
        engine.add(this.berry, this.player);
    }

    restartWithShadow (){
        this.currentRecorder.stopRecording();
        this.resetPersistentLevelObjects();

        this.recorders.push(this.recorders.shift());


        this.currentRecorder.startRecording(this.engine);
        for(let i = 0; i < 2; i++){
            this.currentlyRunningRecordings[i].startPlayback(obj => {
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

    /**
     * @param {number} x
     * @param {number} y
     * @param {number} w
     * @param {number} h
     */
    addPlatformAt(x, y, w, h) {
        this.engine.add(new PlatformObject(x, y, w, h));
    }

    /**
     * @param {number} x
     * @param {number} y
     */
    addPumpkinAt(x, y) {
        this.engine.add(new PumpkinObject(x, y));
    }

    /**
     * @param {number} x
     * @param {number} y
     */
    addBoxAt(x, y) {
        this.engine.add(new BoxObject(x, y));
    }

    /**
     * @param {number} x
     * @param {number} y
     */
    addBlockAt(x, y) {
        this.engine.add(new BlockObject(x, y));
    }

    /**
     * @param {number} x
     * @param {number} y
     * @param {number} w
     * @param {number} h
     */
    addDoorAt(x, y, w, h){
        let door = new DoorObject(x, y, w, h)
        this.engine.add(door);
        return door;
    }

    /**
     * @param {number} x
     * @param {number} y
     */
    addButtonAt(x, y){
        let button = new ButtonObject(x, y, this.engine);
        this.engine.add(button);
        return button;
    }

    /**
     * @param {string} color
     */
    addDoorManager(color){
        let doorManager = new DoorManager(color, this.engine);
        this.engine.add(doorManager);
        return doorManager;
    }

    update() {
        this.recorders.forEach(i => i.update());
        this.engine.update();

        if(events.keysDown['a']){
            this.player.move(-1)
        }
        else if(events.keysDown['d']){
            this.player.move(1)
        }
        else this.player.move(0);

        if(events.keysDown[' '] || events.keysDown['w']){
            this.player.tryJump(this.engine);
        }
        if(events.keysDown['r']) {
            this.reset();
        }

        for(let obj of this.engine.gameObjects.filter(i => this.player.isCollidingWith(i))) {
            if(obj instanceof PumpkinObject) {
                this.engine.remove(obj);
                this.restartWithShadow();
            }
            else if(obj instanceof BerryObject) {
                this.isWon = true;
            }
        }

        this.onUpdate(this);
    }

    /** @param {Renderer} renderer */
    render(renderer) {
        renderer.render(this.engine, this.background);
    }
}