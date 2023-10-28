let chars = [];
let d = document.createElement('div');
d.style.setProperty('display', 'none');
for(let i = 32; i <= 126; i++) {
    let img = document.createElement('img');
    img.src = `res/image/font/${i}.png`;
    chars.push(img);
    d.appendChild(img);
}
document.body.appendChild(d);

async function toImage(text) {
    await Promise.all(chars.map(/** @param {HTMLImageElement} i */ i => new Promise(resolve1 => {
        if(i.complete) resolve1(true);
        else i.addEventListener('load', resolve1);
    })));

    let lines = text.split(/\n/g)
    let W = Math.max(...lines.map(i => i.length));
    let H = lines.length;
    let CHAR_W = 7 * 16;
    let CHAR_H = 10 * 16;
    let CHAR_DW = 8 * 16;
    let CHAR_DH = 11 * 16;
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    canvas.width = W * CHAR_W;
    canvas.height = H * CHAR_H;
    ctx.imageSmoothingEnabled = false;
    for (let y = H; y-- > 0;) {
        let x = 0;
        for (let char of lines[y]) {
            ctx.drawImage(chars[char.charCodeAt(0) - 32], x * CHAR_W, y * CHAR_H, CHAR_DW, CHAR_DH);
            x++;
        }
    }
    console.log(canvas);
    let url = canvas.toDataURL();
    let image = document.createElement('img');
    image.src = url;
    return image;
}

function createText(text='HELLO WORLD'){
    let res = document.createElement('span');
    res.innerText = text;

}