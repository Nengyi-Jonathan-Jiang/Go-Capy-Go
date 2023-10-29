const renderer = new Renderer(document.getElementById('game-canvas'));
window.onresize = (f => (f(), f))(() => renderer.resize());

let currLevelIndex = 0;

const Screens = {
    TITLE:       {id: 0, el: document.getElementById('title-screen')},
    LEVELS:      {id: 1, el: document.getElementById('levels-screen')},
    GAME:        {id: 2, el: document.getElementById('game-screen')},
    get activeScreen() { return Screens.__activeScreen },
    set activeScreen(screen) {
        delete this.__activeScreen.el.dataset.active;
        this.__activeScreen = screen;
        this.__activeScreen.el.dataset.active = "";

        switch (screen) {
            case this.GAME:
                renderer.resize();
                break;
        }
    }
}; Screens.__activeScreen = Screens.TITLE;

document.getElementById('title-screen').onclick = _ => {
    if(Screens.activeScreen === Screens.TITLE) Screens.activeScreen = Screens.LEVELS;
}
document.getElementById('restart-button').onclick = _ => {
    if(Screens.activeScreen === Screens.GAME) levels[currLevelIndex].reset();
}
document.getElementById('quit-button').onclick = _ => {
    if(Screens.activeScreen === Screens.GAME) Screens.activeScreen = Screens.LEVELS
}

for(let i = 0; i < levels.length; i++){
    let d = document.createElement('div');
    d.dataset.desc = levels[i].name;
    let b = document.createElement('button');
    d.onclick = _ => {
        if (Screens.activeScreen === Screens.LEVELS) {
            Screens.activeScreen = Screens.GAME;
            currLevelIndex = i;
            levels[currLevelIndex].reset();
        }
    }
    d.appendChild(b);
    let s = document.createElement('span');
    s.innerText = `${i + 1}. ${levels[i].name}`;
    toImage(`${i + 1}. ${levels[i].name}`.toUpperCase()).then(i => s.replaceWith(i)).catch()
    d.appendChild(s);

    document.getElementById('levels').appendChild(d);
}

requestAnimationFrame(function frame() {
    switch (Screens.activeScreen) {
        case Screens.TITLE:
            document.getElementById('title-audio')?.play().catch(e => {});
            document.getElementById('game-audio')?.pause();
            document.getElementById('game-audio').currentTime = 0;
            break;
        case Screens.LEVELS:
            document.getElementById('title-audio')?.play().catch(e => {});
            document.getElementById('game-audio')?.pause();
            document.getElementById('game-audio').currentTime = 0;
            break;
        case Screens.GAME:
            document.getElementById('game-audio')?.play().catch(e => {});
            document.getElementById('title-audio')?.pause();
            document.getElementById('title-audio').currentTime = 0;
            const level = levels[currLevelIndex];
            level.update();
            level.render(renderer);
            if(level.isWon) {
                document.getElementById('levels').children[currLevelIndex].dataset.win = "";
                currLevelIndex++;
            }
            break;
    }
    requestAnimationFrame(frame);
})

window.onblur = _ => {
    document.querySelectorAll('audio').forEach(i => i.pause());
}