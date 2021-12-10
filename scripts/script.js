const canvas = document.getElementById('project');
const ctx = canvas.getContext('2d');

ctx.beginPath();
ctx.moveTo(638, 0);
ctx.lineTo(638, 600);
ctx.lineWidth = 4;
ctx.setLineDash([5, 3]);
ctx.strokeStyle = "white";
ctx.stroke();
ctx.closePath();
/*
class Rectangle {
    constructor() {
        this.positionX = positionX;
        this.positionY = positionY;
        this.width = width;
        this.height = height;
        this.speedX = 0;
        this.speedY = 0;
    };

    draw = () => {
        ctx.fillStyle = "white";
        ctx.fillRect(this.positionX, this.positionY, this.width, this.height);
    };
};

class Player extends Rectangle {
    constructor(positionX) {
        super(positionX, 265, 20, 70);

    }
} */

class Player {
    constructor(positionX) {
        this.positionX = positionX;
        this.positionY = 265;
        this.speedX = 0;
        this.speedY = 0;
    };

    draw = () => {
        ctx.fillStyle = 'white';
        ctx.fillRect(this.positionX, this.positionY, 20, 70);
    };
};

const ball = {
    positionX: 615,
    positionY: 290,
    draw () {
        ctx.fillStyle = 'white';
        ctx.fillRect(this.positionX, this.positionY, 20, 20);
    },
};

const player1 = new Player(20);
const player2 = new Player(1240);

player1.draw();
player2.draw();

ball.draw();