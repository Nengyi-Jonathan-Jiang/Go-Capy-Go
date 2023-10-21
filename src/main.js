// See src/canvas.js for implementation of Canvas class
const canvas = new Canvas(document.getElementById('game-canvas'));

// New level
/** @type {Level[]} */
const levels = [];

{
    const level1 = new Level();
    // for(let x = 0; x < 16; x++) {
    //     level1.setFeatureAt(x, 0, Level.FEATURE_PLATFORM);
    // }
    levels.push(level1)
}

let currentLevelNumber = 1;

Canvas.createAnimation(() => {
    // Resize canvas to fit CSS
    canvas.resize();
    // Clears the canvas to white
    canvas.clear('white');

    const currentLevel = levels[currentLevelNumber - 1];

    currentLevel.draw(canvas);
})

