const renderer = new Renderer(document.getElementById('game-canvas'));
window.onresize = (f => (f(), f))(() => renderer.resize());

const levels = [
    // // Intro
    new Level(document.getElementById("level-1-background"), function(level, player, berry){}),
    // // Box, button, and door
    new Level(document.getElementById("level-2-background"), function(level, player, berry){
        level.addPlatformAt(4, 6.25, 2, 0.5);
        level.addPlatformAt(7.5, 3.5, 1, 5);
        level.addPlatformAt(11.5, 5.5, 1, 5);
        level.addBoxAt(4, 5.5);
        let doorManager0 = level.addDoorManager("#fac");
        doorManager0.linkDoor(level.addDoorAt(7.5, 7, 1, 2))
        doorManager0.linkButton(level.addButtonAt(1.5, 8))
        let doorManager1 = level.addDoorManager("#4fc");
        doorManager1.linkDoor(level.addDoorAt(10.5, 5.5, 1, -5))
        doorManager1.linkButton(level.addButtonAt(9.5, 8))
    }),
    // // Box, Button, raised door, pumpkin
    // new Level(document.getElementById("level-1-background"), function(level, player, berry){
    //     level.addPlatformAt(8, 2.5, 1, 3);
    //
    //     level.addPlatformAt(3.5, 6.25, 1, .5);
    //     level.addBoxAt(3.5, 5.5);
    //
    //     let doorManager1 = level.addDoorManager("#fac");
    //     doorManager1.linkButton(level.addButtonAt(1.5, 8));
    //     doorManager1.linkDoor(level.addDoorAt(8, 4.5, 1, 1));
    //
    //     let doorManager2 = level.addDoorManager("#4fa");
    //     doorManager2.linkButton(level.addButtonAt(10, 8));
    //     doorManager2.linkDoor(level.addDoorAt(11, 5.5, 1, -5));
    //
    //     level.addPlatformAt(12, 5.5, 1, 5);
    //
    //     level.addPlatformAt(8, 6.5, 1, 3);
    // }, function(level) {
    //     level.addPumpkinAt(3.5, 4);
    // }),

    // "Diode" and pumpkin
    // new Level(document.getElementById("level-1-background"), function(level, player, berry){
    //     level.addPlatformAt(9.5, 3.5, 1, 5);
    //
    //     level.addPlatformAt(2.5, 4.75, 3, .5);
    //     level.addPlatformAt(7.5, 4.75, 3, .5);
    //     level.addPlatformAt(8, 3.25, 2, .5);
    //     level.addPlatformAt(4, 6.25, 2, .5);
    //     level.addPlatformAt(5.5, 5.5, 1, 2);
    //
    //     let doorManager1 = level.addDoorManager("#fac");
    //     doorManager1.linkButton(level.addButtonAt(8.5, 4.5));
    //     doorManager1.linkDoor(level.addDoorAt(9.5, 7, 1, 2));
    //
    //     let doorManager2 = level.addDoorManager("#4fa");
    //     doorManager2.linkButton(level.addButtonAt(3.5, 6));
    //     doorManager2.linkDoor(level.addDoorAt(4.5, 5.25, 1, -1.5));
    //
    //     level.addBoxAt(7.5, 4);
    // }, function(level) {
    //     level.addPumpkinAt(8.5, 2.4);
    // }),
    // "Three doors"
    new Level(document.getElementById("level-1-background"), function(level, player, berry){

        level.addPlatformAt(4, 6.25, 4, .5);
        level.addPlatformAt(3, 4.75, 4, .5);
        let doorManager1 = level.addDoorManager("#fac");
        doorManager1.linkButton(level.addButtonAt(1.5, 4.5));
        doorManager1.linkDoor(level.addDoorAt(13.5, 7.5, 1, 1));
        level.addBoxAt(4.5, 4);
        level.addBoxAt(3.5, 4);
        level.addPlatformAt(6.5, 3.75, 1, 5.5);

        level.addPlatformAt(9, 6.25, 2, .5);
        level.addPlatformAt(8, 4.75, 2, .5);
        let doorManager2 = level.addDoorManager("#4fa");
        doorManager2.linkButton(level.addButtonAt(7.5, 4.5));
        doorManager2.linkButton(level.addButtonAt(2.5, 4.5));
        doorManager2.linkButton(level.addButtonAt(4.5, 6));
        doorManager2.linkDoor(level.addDoorAt(5.5, 5.25, 1, -1.5));
        doorManager2.linkDoor(level.addDoorAt(11.5, 7.5, 1, 1));
        level.addBoxAt(8.5, 4);
        level.addPlatformAt(10.5, 5.5, 1, 2);

        level.addPlatformAt(13, 6.25, 2, .5);
        level.addPlatformAt(12, 4.75, 2, .5);
        let doorManager3 = level.addDoorManager("#fc4");
        doorManager3.linkButton(level.addButtonAt(11.5, 4.5));
        doorManager3.linkDoor(level.addDoorAt(12.5, 7.5, 1, 1));
        level.addBoxAt(12.5, 4);
        level.addPlatformAt(14.5, 5.5, 1, 2);

    }, function(level) {
        level.addPumpkinAt(5.5, 2.9);
    }),
    //
    //
    // // Box through door
    // new Level(document.getElementById("level-1-background"), function(level, player, berry){
    //     level.addPlatformAt(8, 3, 1, 4);
    //
    //     let doorManager1 = level.addDoorManager("#fac");
    //
    //     doorManager1.linkButton(level.addButtonAt(1.5, 8));
    //     doorManager1.linkButton(level.addButtonAt(6, 8));
    //     doorManager1.linkDoor(level.addDoorAt(8, 7.5, 1, 1));
    //
    //     level.addPlatformAt(8, 6.5, 1, 1);
    //
    //     let doorManager2 = level.addDoorManager("#4fa");
    //     doorManager2.linkButton(level.addButtonAt(14.5, 8));
    //     doorManager2.linkDoor(level.addDoorAt(8, 5.5, 1, 1));
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
    //     level.addBoxAt(2.5, 2);
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