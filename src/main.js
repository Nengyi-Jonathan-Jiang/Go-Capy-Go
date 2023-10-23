const engine = new GameEngine();

{
    engine.add(new PlatformObject(0, 0, 32, 1));
    engine.add(new PlatformObject(0, 17, 32, 1));
    engine.add(new PlatformObject(0, 1, 1, 16));
    engine.add(new PlatformObject(31, 1, 1, 16));

    engine.add(new PlatformObject(6, 1, 1, 2));
    engine.add(new PlatformObject(3, 5, 2));
}

const player = new PlayerObject();
player.position = new Vec2(1.5, 1.5);
engine.add(player);

engine.add(new BoxObject(4, 2));
engine.add(new BoxObject(4, 4));

const renderer = new Renderer(document.getElementById('game-canvas'));
window.onresize = (f => (f(), f))(() => renderer.resize());

requestAnimationFrame(function frame() {
    renderer.render(engine);
    engine.update();

    if(events.keysDown['arrowleft']){
        player.move(-1)
    }
    else if(events.keysDown['arrowright']){
        player.move(1)
    }
    else player.move(0);

    if(events.keysDown[' ']){
        player.tryJump();
    }

    requestAnimationFrame(frame);
})