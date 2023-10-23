const engine = new GameEngine();

{
    engine.add(new PlatformObject(0, 0, 16, 1));
    engine.add(new PlatformObject(0, 8, 16, 1));
    engine.add(new PlatformObject(0, 0, 1, 16));
    engine.add(new PlatformObject(15, 0, 1, 16));

    engine.add(new PlatformObject(4, 1));
    engine.add(new PlatformObject(2, 3));
}

engine.add(new PumpkinObject(2.5, 7));

const player = new PlayerObject();
player.position = new Vec2(1.5, 1.5);
engine.add(player);

engine.add(new BoxObject(2.5, 2));

const renderer = new Renderer(document.getElementById('game-canvas'));
window.onresize = (f => (f(), f))(() => renderer.resize());

const recorder = new ShadowRecorder();

recorder.startRecording(engine);

requestAnimationFrame(function frame() {
    recorder.update();
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
        player.vy = -0.1;
    }

    if(events.keysDown['r']) {
        recorder.stopRecording();
        recorder.startPlayback();
    }

    if(!recorder.hasRecording) {
        recorder.startRecording(engine);
    }

    requestAnimationFrame(frame);
})