const renderer = new Renderer(document.getElementById('game-canvas'));
window.onresize = (f => (f(), f))(() => renderer.resize());

let currLevelIndex = 0;
let wonLevels = new Set;

document.addEventListener('dblclick', e => {
    document.getElementById('game').requestFullscreen();
});

const Screens = {
    TITLE:       document.getElementById('title-screen'),
    LEVELS:      document.getElementById('levels-screen'),
    GAME:        document.getElementById('game-screen'),
    END:        document.getElementById('end-screen'),
    get activeScreen() { return Screens.__activeScreen },
    set activeScreen(screen) {
        delete this.__activeScreen.dataset.active;
        this.__activeScreen = screen;
        this.__activeScreen.dataset.active = "";

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
document.getElementById('restart-button').onclick = ({target}) => {
    if(Screens.activeScreen === Screens.GAME) levels[currLevelIndex].reset();
    target.blur();
}
document.getElementById('quit-button').onclick = _ => {
    if(Screens.activeScreen === Screens.GAME) Screens.activeScreen = Screens.LEVELS
}
document.getElementById('end-screen').onclick = _ => {
    if(Screens.activeScreen === Screens.END) Screens.activeScreen = Screens.LEVELS;
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
    let levelDisplayName;
    if (i < 4) {
        levelDisplayName = `TUTOR ${'ABCD'[i]}.  ${levels[i].name}`;
    } else {
        levelDisplayName = `LEVEL ${i - 3}.  ${levels[i].name}`;
    }
    s.innerText = levelDisplayName;
    toImage(levelDisplayName.toUpperCase()).then(i => s.replaceWith(i)).catch()
    d.appendChild(s);

    document.getElementById('levels').appendChild(d);
}

let last_time = 0;
requestAnimationFrame(function frame(currTime) {
    const delta_time = currTime - last_time;
    last_time = currTime;

    switch (Screens.activeScreen) {
        case Screens.TITLE:
        case Screens.LEVELS:
            document.getElementById('title-audio')?.play().catch(e => {});
            document.getElementById('game-audio')?.pause();
            document.getElementById('game-audio').currentTime = 0;
            document.getElementById('win-audio')?.pause();
            document.getElementById('win-audio').currentTime = 0;
            break;
        case Screens.GAME:
            document.getElementById('game-audio')?.play().catch(e => {});
            document.getElementById('title-audio')?.pause();
            document.getElementById('title-audio').currentTime = 0;
            document.getElementById('win-audio')?.pause();
            document.getElementById('win-audio').currentTime = 0;

            /** @type {Level} */
            const level = levels[currLevelIndex];
            level.update(Math.min(delta_time, 16.666));
            level.render(renderer);
            if(level.isWon) {
                document.getElementById('levels').children[currLevelIndex].dataset.win = "";
                wonLevels.add(currLevelIndex);
                for(currLevelIndex = 0; currLevelIndex < levels.length; currLevelIndex++) {
                    if(!wonLevels.has(currLevelIndex)){
                        levels[currLevelIndex].reset();
                        break;
                    }
                }
                if(currLevelIndex === levels.length) {
                    Screens.activeScreen = Screens.END;
                }
            }
            break;
        case Screens.END:
            document.getElementById('win-audio')?.play().catch(e => {});
            document.getElementById('game-audio')?.pause();
            document.getElementById('game-audio').currentTime = 0;
            document.getElementById('title-audio')?.pause();
            document.getElementById('title-audio').currentTime = 0;
            break;
    }
    requestAnimationFrame(frame);
})

window.onblur = _ => {
    document.querySelectorAll('audio').forEach(i => i.pause());
}