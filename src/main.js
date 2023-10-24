const renderer = new Renderer(document.getElementById('game-canvas'));
window.onresize = (f => (f(), f))(() => renderer.resize());

const levels = [
    new Level(document.getElementById("level-1-background"), function(level, player, berry){}),
    new Level(document.getElementById("level-2-background"), function(level, player, berry){
        level.addPlatformAt(7.5, 1, 1, 5);

        let buttonObject = new ButtonObject(1.5, 8, level.engine);
        level.engine.add(buttonObject);
        let doorObject = new DoorObject(8, 7, 1, 2, "#fac");
        level.engine.add(doorObject);
        doorObject.link(buttonObject);

        level.addPlatformAt(3, 6.25, 2, .5);
        level.addBoxAt(4, 5.75);
    }),
    new Level(document.getElementById("level-1-background"), function(level, player, berry){
        level.addPlatformAt(7.5, 1, 1, 4);

        let buttonObject = new ButtonObject(1.5, 8, level.engine);
        level.engine.add(buttonObject);
        let buttonObject2 = new ButtonObject(6, 8, level.engine);
        level.engine.add(buttonObject2);
        let doorObject = new DoorObject(8, 7.5, 1, 1, "#fac");
        level.engine.add(doorObject);
        doorObject.link(buttonObject);
        doorObject.link(buttonObject2);

        level.addPlatformAt(7.5, 6, 1, 1);

        let buttonObject3 = new ButtonObject(14.5, 8, level.engine);
        level.engine.add(buttonObject3);
        let doorObject2 = new DoorObject(8, 5.5, 1, 1, "#8fa");
        level.engine.add(doorObject2);
        doorObject2.link(buttonObject3);

        level.addPlatformAt(3, 6.25, 2, .5);
        level.addBoxAt(4, 5.75);
        level.addBoxAt(4, 4.75);

        berry.y -= 2;
    }),
    new Level(document.getElementById("level-1-background"), function(level, player, berry){
        level.addPlatformAt(9, 4.5, 1, 5);

        level.addPlatformAt(4, 6.25, 2, .5);
        level.addBoxAt(4, 5.75);
    }, function(level) {
        level.addPumpkinAt(5, 4);
    }),
    new Level(document.getElementById("level-1-background"), function(level, player, berry){
        level.addPlatformAt(9, 3.5, 1, 7);

        level.addPlatformAt(4, 6.25, 2, .5);
        level.addBoxAt(4, 5.75);
    }, function(level) {
        level.addPumpkinAt(5, 4);
    }),
    // new Level(document.getElementById("level-1-background"), function(level, player, berry){
    //     level.addPlatformAt(4, 1, 1, 1);
    //     level.addPlatformAt(2, 3, 1, 1);
    //
    //     level.addBoxAt(new BoxObject(2.5, 2));
    //
    //     player.position = new Vec2(1.5, 1.5);
    //     berry.position = new Vec2(4.5, 7.5);
    // }, function(level) {
    //     level.addPumpkinAt(2.5, 7);
    // }),
]

let i = 0;

document.getElementById('restart').onmousedown = _ => levels[i].reset();

requestAnimationFrame(function frame() {
    const level = levels[i];
    level.updateAndRender(renderer);
    if(level.isWon) {
        i++;
        levels[i].reset();
    }
    if(i >= levels.length) {
        alert('You beat the game');
        return;
    }
    requestAnimationFrame(frame);
})