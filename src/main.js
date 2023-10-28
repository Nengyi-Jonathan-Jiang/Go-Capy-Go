const renderer = new Renderer(document.getElementById('game-canvas'));
window.onresize = (f => (f(), f))(() => renderer.resize());

let currLevelIndex = 0;
let time = 0;
let levelTime = 0;

const Screens = {
    TITLE:       {id: 0, el: document.getElementById('title-screen')},
    LEVELS:      {id: 1, el: document.getElementById('levels-screen')},
    GAME:        {id: 2, el: document.getElementById('game-screen')},
    LEVEL_BEGIN: {id: 3, el: document.getElementById('level-begin')},
    LEVEL_END:   {id: 4, el: document.getElementById('level-end')},
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

document.getElementById('play-button').onclick = _ => {
    if(Screens.activeScreen === Screens.TITLE) Screens.activeScreen = Screens.LEVELS;
}
document.getElementById('restart-button').onclick = _ => {
    if(Screens.activeScreen === Screens.GAME) levels[currLevelIndex].reset();
}
document.getElementById('quit-button').onclick = _ => {
    if(Screens.activeScreen === Screens.GAME) Screens.activeScreen = Screens.TITLE
}

for(let i = 0; i < levels.length; i++){
    let d = document.createElement('div');
    d.innerText = `Level ${i + 1}`;
    d.onclick = _ => {
        if (Screens.activeScreen === Screens.LEVELS) {
            Screens.activeScreen = Screens.GAME;
            currLevelIndex = i;
            time = Date.now() / 1000;
        }
    }
    document.getElementById('levels').appendChild(d);
}

requestAnimationFrame(function frame() {
    switch (Screens.activeScreen) {
        case Screens.TITLE:
            break;
        case Screens.GAME:
            const level = levels[currLevelIndex];
            level.update();
            level.render(renderer);
            if(level.isWon) {
                currLevelIndex++;
                levelTime = Date.now() / 1000 - time;
                Screens.activeScreen = Screens.LEVEL_END;
                time = Date.now();
            }
            break;
        case Screens.LEVEL_END:
            break;

    }
    requestAnimationFrame(frame);
})