const events = new class Events {
    keysDown = {};
    keysPressed = new Proxy({}, {get(target, prop, _){
        if (events.keysDown[prop]) {
            return !target[prop] && (target[prop] = true);
        }
        else return target[prop] = false;
    }});

    /** @type {Map<number, Touch>} */
    #activeTouches = new Map;

    /** @type {Touch[]} */
    get activeTouches() {
        return [...this.#activeTouches.values()];
    }

    /** @type {function(...Touch)} */
    #updateTouches = (...touches) => {
        this.#activeTouches = new Map;
        for(const touch of touches) {
            this.#activeTouches.set(touch.identifier, touch);
        }
    }

    constructor() {
        window.addEventListener('keydown',e=>{events.keysDown[e.key.toLowerCase()] = true});
        window.addEventListener('keyup',e=>{events.keysDown[e.key.toLowerCase()] = false});
        window.addEventListener('blur', _=>(events.keysDown = {}));
        window.addEventListener('touchstart', e => {
            this.#updateTouches(...e.changedTouches, ...e.targetTouches);
        });
        window.addEventListener('touchmove', e => {
            this.#updateTouches(...e.changedTouches, ...e.targetTouches);
        })
        window.addEventListener('touchend', e => {
            this.#updateTouches(...e.targetTouches);
        })

        window.addEventListener('contextmenu', e => e.preventDefault());
    }
}