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

class Rectangle {
    constructor(positionX, positionY, width, height) {
        this.positionX = positionX;
        this.positionY = positionY;
        this.width = width;
        this.height = height;
        this.speedY = 0;
    };

    draw = () => {
        ctx.fillStyle = "white";
        ctx.fillRect(this.positionX, this.positionY, this.width, this.height);
    };
};

class Player extends Rectangle {
    constructor(positionX) {
        super(positionX, 265, 20, 70, 0);
    };

    moveUp = () => {
        ctx.clearRect(this.positionX, this.positionY, this.width, this.height);
        this.speedY = 8;
        this.positionY -= this.speedY;
        this.draw();
    };

    moveDown = () => {
        ctx.clearRect(this.positionX, this.positionY, this.width, this.height);
        this.speedY = 8;
        this.positionY += this.speedY;
        this.draw();
    };
};

const player1 = new Player(20);
const player2 = new Player(1240);

player1.draw();
player2.draw();

window.addEventListener("load", () => {
    document.addEventListener("keydown", (e) => {
        switch (e.key) {
            case "w":
                player1.moveUp();
                break;
            case "s":
                player1.moveDown();
                break;
            case "ArrowUp":
                player2.moveUp();
                break;
            case "ArrowDown":
                player2.moveDown();
        };
    });
});

class Ball extends Rectangle {
    constructor() {
        super(615, 290, 20, 20, 0);
        this.speedX = 0;
    };
};

const ball = new Ball();

ball.draw();