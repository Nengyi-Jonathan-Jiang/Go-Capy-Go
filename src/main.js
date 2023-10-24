const renderer = new Renderer(document.getElementById('game-canvas'));
window.onresize = (f => (f(), f))(() => renderer.resize());

const levels = [
    new Level(document.getElementById("level-1-background"), function(level, player, berry){

    }),
    new Level(document.getElementById("level-1-background"), function(level, player, berry){
        level.addBoxAt(5.5, 7.5);
        level.addBoxAt(7.5, 7.5);
        level.addBoxAt(9.5, 7.5);
    }),
    new Level(document.getElementById("level-1-background"), function(level, player, berry){
        level.addPlatformAt(9, 5, 1, 3);

        level.addPlatformAt(4, 6.25, 2, .5);
        level.addBoxAt(4, 5.75);
    }, function(level) {
        level.addPumpkinAt(1.5, 5.5);
    }),
    new Level(document.getElementById("level-1-background"), function(level, player, berry){
        level.addPlatformAt(4, 1, 1, 1);
        level.addPlatformAt(2, 3, 1, 1);

        level.addBoxAt(new BoxObject(2.5, 2));

        player.position = new Vec2(1.5, 1.5);
        berry.position = new Vec2(4.5, 7.5);
    }, function(level) {
        level.addPumpkinAt(2.5, 7);
    }),
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