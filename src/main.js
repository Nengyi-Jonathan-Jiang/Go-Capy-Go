const renderer = new Renderer(document.getElementById('game-canvas'));
window.onresize = (f => (f(), f))(() => renderer.resize());

const levels = [
    // Intro
    // new Level(document.getElementById("level-1-background"), function(level, player, berry){}),
    // Box, button, and door
    new Level(document.getElementById("level-2-background"), function(level, player, berry){
        level.addPlatformAt(8, 3.5, 1, 5);

        let doorManager = level.addDoorManager("#fac");
        doorManager.linkButton(level.addButtonAt(1.5, 8));
        doorManager.linkDoor(level.addDoorAt(8, 7, 1, 2));

        level.addPlatformAt(4, 6.25, 2, .5);
        level.addBoxAt(4, 5.75);
    }),

    // new Level(document.getElementById("level-1-background"), function(level, player, berry){
    //     level.addPlatformAt(8, 2.5, 1, 3);
    //
    //     level.addPlatformAt(3.5, 6.25, 1, .5);
    //     level.addBoxAt(3.5, 5.5);
    //     let buttonObject = new ButtonObject(1.5, 8, level.engine);
    //     level.engine.add(buttonObject);
    //     let doorObject = new DoorObject(8, 4.5, 1, 1, "#fac");
    //     level.engine.add(doorObject);
    //     doorObject.link(buttonObject);
    //
    //     let buttonObject2 = new ButtonObject(10, 8, level.engine);
    //     level.engine.add(buttonObject2);
    //     let doorObject2 = new DoorObject(11, 5.5, 1, -5, "#4fa");
    //     level.engine.add(doorObject2);
    //     doorObject2.link(buttonObject2);
    //
    //     level.addPlatformAt(12, 5.5, 1, 5);
    //
    //     level.addPlatformAt(8, 6.5, 1, 3);
    // }, function(level) {
    //     level.addPumpkinAt(3.5, 4);
    // }),
    //
    // new Level(document.getElementById("level-1-background"), function(level, player, berry){
    //     level.addPlatformAt(8, 3, 1, 4);
    //
    //     let buttonObject = new ButtonObject(1.5, 8, level.engine);
    //     level.engine.add(buttonObject);
    //     let buttonObject2 = new ButtonObject(6, 8, level.engine);
    //     level.engine.add(buttonObject2);
    //     let doorObject = new DoorObject(8, 7.5, 1, 1, "#fac");
    //     level.engine.add(doorObject);
    //     doorObject.link(buttonObject);
    //     doorObject.link(buttonObject2);
    //
    //     level.addPlatformAt(8, 6.5, 1, 1);
    //
    //     let buttonObject3 = new ButtonObject(14.5, 8, level.engine);
    //     level.engine.add(buttonObject3);
    //     let doorObject2 = new DoorObject(8, 5.5, 1, 1, "#8fa");
    //     level.engine.add(doorObject2);
    //     doorObject2.link(buttonObject3);
    //
    //     level.addPlatformAt(4   , 6.25, 2, .5);
    //     level.addBoxAt(4, 5.75);
    //     level.addBoxAt(4, 4.75);
    //
    //     berry.y -= 3.5;
    // }),
    // new Level(document.getElementById("level-1-background"), function(level, player, berry){
    //     level.addPlatformAt(9, 6.25, 1, 3.5);
    //
    //     level.addPlatformAt(4.5, 6.25, 2, .5);
    //     level.addBoxAt(3.5, 5.75);
    // }, function(level) {
    //     level.addPumpkinAt(4.5, 4);
    // }),
    // new Level(document.getElementById("level-1-background"), function(level, player, berry){
    //     level.addPlatformAt(9, 5.5, 1, 5);
    //
    //     level.addPlatformAt(5, 6.25, 2, .5);
    //     level.addBoxAt(4, 5.75);
    // }, function(level) {
    //     level.addPumpkinAt(5, 4);
    // }),
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