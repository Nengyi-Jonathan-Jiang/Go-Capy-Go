const renderer = new Renderer(document.getElementById('game-canvas'));
window.onresize = (f => (f(), f))(() => renderer.resize());

let i = 0;

document.getElementById('restart').onmousedown = _ => levels[i].reset();

requestAnimationFrame(function frame() {
    const level = levels[i];
    level.updateAndRender(renderer);
    if(level.isWon) {
        i++;
        if(i < levels.length) {
            levels[i].reset();
        }
    }
    if(i >= levels.length) {
        alert('You beat the game');
        return;
    }
    requestAnimationFrame(frame);
})