let chars = [];
for(let i = 32; i <= 126; i++) {
    let img = document.createElement('img');
    img.src = `res/image/font/${i}.png`;
    chars.push(img);
}

document.getElementById('input').onchange = document.getElementById('input').oninput = ({target}) => {
    let s = target.value ?? "Enter text above";
    let lines = s.split(/\n/g)
    let W = Math.max(...lines.map(i => i.length));
    let H = lines.length;
    let canvas = document.getElementById('output');
    let ctx = canvas.getContext('2d');
    let CHAR_W = 7 * 16;
    let CHAR_H = 11 * 16;
    let CHAR_DW = 8 * 16;
    let CHAR_DH = 11 * 16;
    canvas.width = W * CHAR_W;
    canvas.height = H * CHAR_H;
    ctx.imageSmoothingEnabled = false;
    for (y = H; y-- > 0;) {
        let x = 0;
        for (let char of lines[y]) {
            ctx.drawImage(chars[char.charCodeAt(0) - 32], x * CHAR_W, y * CHAR_H, CHAR_DW, CHAR_DH);
            x++;
        }
    }
}