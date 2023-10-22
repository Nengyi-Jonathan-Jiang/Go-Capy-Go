const events = {
    keysDown: {},
    init: () => {
        window.addEventListener('keydown',e=>{events.keysDown[e.key.toLowerCase()] = true});
        window.addEventListener('keyup',e=>{events.keysDown[e.key.toLowerCase()] = false});
        window.addEventListener('blur', _=>(events.keysDown = {}));
    },
}
events.init();