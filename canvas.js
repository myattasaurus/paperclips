class Paperclip {
    constructor() {
        this.height = 8
        this.length = {
            inner: {
                top: 12,
                bottom: 15
            },
            outer: {
                top: 18,
                bottom: 17
            }
        };

        this.rotation = {
            perSecond: 1,
            radians: 0
        };

        this.x = 200;
        this.y = 200;

        this.dx = 0;
        this.dy = 0;
    }

    update(timestamp) {

    }
}

let i = 0;

function onLoad() {
    requestAnimationFrame(first);
}

let spawn;
function first(timestamp) {
    spawn = timestamp;
    loop(timestamp);
    requestAnimationFrame(loop);
}

function loop(timestamp) {
    let rotationsPerSecond = 1;
    draw(rotationsPerSecond * timestamp / 1000);
    requestAnimationFrame(loop);
}

function draw(secondsSinceSpawn) {
    let canvas = document.getElementById('canvas');
    let bodyRect = document.getElementsByTagName('body')[0].getBoundingClientRect();
    canvas.setAttribute('height', bodyRect.height);
    canvas.setAttribute('width', bodyRect.width);
    if (canvas.getContext) {
        let ctx = canvas.getContext('2d');

        let theta = secondsSinceSpawn % (2 * Math.PI);
        ctx.save();
        ctx.translate(200, 200);
        ctx.rotate(theta);
        ctx.translate(-200, -200);
        draw2();
        ctx.restore();
    }
}

function draw2() {
    let canvas = document.getElementById('canvas');
    let bodyRect = document.getElementsByTagName('body')[0].getBoundingClientRect();
    // canvas.setAttribute('height', bodyRect.height);
    // canvas.setAttribute('width', bodyRect.width);
    if (canvas.getContext) {
        let ctx = canvas.getContext('2d');

        ctx.lineCap = 'round';
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'gray';

        let height = Number(document.getElementById('height').value);
        let width1 = Number(document.getElementById('width1').value);
        let width2 = Number(document.getElementById('width2').value);
        let width3 = Number(document.getElementById('width3').value);
        let width4 = Number(document.getElementById('width4').value);
        let tineGap = 0;

        ctx.beginPath();

        let x = 200;
        let y = 200;

        let width = height - 1 + width2;
        let radius = height / 2;
        x += radius + width1 - width / 2;
        y += height / 2;
        ctx.moveTo(x, y);

        x -= width1;
        ctx.lineTo(x, y);

        let centerX = x;
        let centerY = y - radius;
        ctx.arc(centerX, centerY, radius, Math.PI / 2, 3 * Math.PI / 2, false);

        x += width2;
        y -= height;
        ctx.lineTo(x, y);

        radius -= ctx.lineWidth;
        centerX = x;
        centerY = y + radius;
        ctx.arc(centerX, centerY, radius, 3 * Math.PI / 2, Math.PI / 2, false);

        x -= width3;
        y += 2 * radius;
        ctx.lineTo(x, y);

        radius -= ctx.lineWidth;
        centerX = x;
        centerY = y - radius;
        ctx.arc(centerX, centerY, radius, Math.PI / 2, 3 * Math.PI / 2, false);

        x += width4;
        y -= 2 * radius;
        ctx.lineTo(x, y);

        ctx.stroke();
    }
}

function drawll() {
    draw();
    // draw2();
}

let paperclip8 = {
    height: 8,
    bottomOuterLength: 17,
    topOuterLength: 18,
    bottomInnerLength: 15,
    topInnerLength: 12
};

let paperclip7 = {
    height: 7,
    bottomOuterLength: 15,
    topOuterLength: 16,
    bottomInnerLength: 13,
    topInnerLength: 11
};