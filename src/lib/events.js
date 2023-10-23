const events = {
    keysDown: {},
    keysPressed: new Proxy({}, {get(target, prop, _){
            if (events.keysDown[prop]) {
                return !target[prop] && (target[prop] = true);
            }
            else return target[prop] = false;
        }}),
    init: () => {
        window.addEventListener('keydown',e=>{events.keysDown[e.key.toLowerCase()] = true});
        window.addEventListener('keyup',e=>{events.keysDown[e.key.toLowerCase()] = false});
        window.addEventListener('blur', _=>(events.keysDown = {}));
    },
}
events.init();