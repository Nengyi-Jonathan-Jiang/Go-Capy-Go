const renderer = new Renderer(document.getElementById('game-canvas'));
window.onresize = (f => (f(), f))(() => renderer.resize());

let i = 0;

requestAnimationFrame(function frame() {
    const level = levels[i];
    level.update();
    level.render(renderer);
    if(level.isWon) {
        i++;
        if(i < levels.length) {
            levels[i].reset();
        }
    }
    if(i >= levels.length) {
        alert('You beat the game');
        i = 0;
    }
    requestAnimationFrame(frame);
})