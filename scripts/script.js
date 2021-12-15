const canvas = document.getElementById('project');
const ctx = canvas.getContext('2d');

const drawNet = () => {
    ctx.beginPath();
    ctx.moveTo(638, 0);
    ctx.lineTo(638, 600);
    ctx.lineWidth = 4;
    ctx.setLineDash([5, 3]);
    ctx.strokeStyle = "white";
    ctx.stroke();
    ctx.closePath();
};

drawNet();

class Rectangle {
    constructor(positionX, positionY, width, height) {
        this.positionX = positionX;
        this.positionY = positionY;
        this.width = width;
        this.height = height;
        this.speedY = 0;
    };

    draw() {
        ctx.fillStyle = "white";
        ctx.fillRect(this.positionX, this.positionY, this.width, this.height);
    };
};

class Player extends Rectangle {
    constructor(positionX) {
        super(positionX, 265, 20, 70, 0);
    };

    moveUp() {
        if (this.positionY > 0) {
            this.speedY = 8;
        } else {
            this.speedY = 0;
        };
        this.positionY -= this.speedY;
    };

    moveDown() {
        if (this.positionY < (canvas.height - this.height)) {
            this.speedY = 8;
        } else {
            this.speedY = 0;
        };
        this.positionY += this.speedY;
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
        updateCanvas();
    });
});
/*
function degreesToRadians(degree) {
    return (Math. PI / 180) * degree;
}; */

class Ball extends Rectangle {
    constructor() {
        super(615, 290, 20, 20, 0);
        this.speedX = 0;
        this.angle = 180;
    };

    newPosition() {
        if ((this.positionY + this.speedY) < (canvas.height - this.height) || (this.positionY + this.speedY) > 0) {
            this.speedY = -2;
        } else {
            this.speedY = 2;
        };
        this.speedX = 2;

        this.positionX += this.speedX;
        this.positionY += this.speedY;
    };

    move() {
        const intervalId = setInterval(() => {
            updateCanvas();
            this.newPosition()
        }, 10);
    };
};

const ball = new Ball();

ball.draw();
ball.move();

function updateCanvas() {
    ctx.clearRect(0,0,canvas.width, canvas.height);

    drawNet();
    player1.draw();
    player2.draw();
    ball.draw();
};