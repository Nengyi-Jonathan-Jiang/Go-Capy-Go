class Level {
    static FEATURE_AIR = null;
    static FEATURE_PLATFORM = {};

    constructor() {
        this.features = new Array(16 * 9).fill(Level.FEATURE_AIR);
        // By default, there will be walls around the level
        for(let x = 0; x < 16; x++) this.setFeatureAt(x, 0, Level.FEATURE_PLATFORM).setFeatureAt(x, 8, Level.FEATURE_PLATFORM);
        for(let y = 0; y < 9; y++) this.setFeatureAt(0, y, Level.FEATURE_PLATFORM).setFeatureAt(15, y, Level.FEATURE_PLATFORM);
    }

    /** @param {Canvas} canvas */
    draw(canvas) {
        let CELL_SIZE = canvas.width / 16;
        for(let x = 0; x < 16; x++) {
            for(let y = 0; y < 16; y++) {
                let feature = this.getFeatureAt(x, y);
                if(feature === Level.FEATURE_AIR) continue;
                if(feature === Level.FEATURE_PLATFORM) {
                    canvas.setFillColor('#630');
                    canvas.fillRect(
                        x * CELL_SIZE,
                        (9 - y) * CELL_SIZE,
                        (x + 1) * CELL_SIZE,
                        (8 - y) * CELL_SIZE
                    );
                }
            }
        }
    }

    setFeatureAt(x, y, feature) {
        this.features[x * 16 + y] = feature;
        return this;
    }

    getFeatureAt(x, y) {
        return this.features[x * 16 + y];
    }
}