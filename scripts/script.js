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
    constructor(positionX, positionY, width, height, speedY) {
        this.positionX = positionX;
        this.positionY = positionY;
        this.width = width;
        this.height = height;
        this.speedY = speedY;
    };

    draw() {
        ctx.fillStyle = "white";
        ctx.fillRect(this.positionX, this.positionY, this.width, this.height);
    };

    left() {
        return this.positionX;
    };
    right() {
        return this.positionX + this.width;
    };
    top() {
        return this.positionY;
    };
    bottom() {
        return this.positionY + this.height;
    };
    
    crashWith(obstacle) {
        return !(
          this.bottom() < obstacle.top() ||
          this.top() > obstacle.bottom() ||
          this.right() < obstacle.left() ||
          this.left() > obstacle.right()
        );
    };
};

class Player extends Rectangle {
    constructor(positionX) {
        super(positionX, 265, 20, 90, 0);
    };

    moveUp() {
        if (this.positionY > 0) {
            this.speedY = 20;
        } else {
            this.speedY = 0;
        };
        this.positionY -= this.speedY;
    };

    moveDown() {
        if (this.positionY < (canvas.height - this.height)) {
            this.speedY = 20;
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

class Ball extends Rectangle {
    constructor() {
        super(615, 290, 20, 20, -2);
        this.speedX = 8;
    };

    left() {
        return this.positionX;
    };
    right() {
        return this.positionX + this.width;
    };
    top() {
        return this.positionY;
    };
    bottom() {
        return this.positionY + this.height;
    };
    
    crashWith(obstacle) {
        return !(
          this.bottom() < obstacle.top() ||
          this.top() > obstacle.bottom() ||
          this.right() < obstacle.left() ||
          this.left() > obstacle.right()
        );
    };

    newPosition() {
        updateCanvas();

        const crashedPlayer1 = this.crashWith(player1);
        const crashedPlayer2 = this.crashWith(player2);

        if(crashedPlayer1 || crashedPlayer2) {
            this.speedX = -this.speedX;
        };
        if((this.positionY + this.speedY) > (canvas.height - this.height) || (this.positionY + this.speedY) < 0) {
            this.speedY = -this.speedY;
        };

        this.positionX += this.speedX;
        this.positionY += this.speedY;
    };

    moveBall() {
        const intervalId = setInterval(() => {
            this.newPosition();

            if (this.positionX > (canvas.width + this.width) || this.positionX < -40) {
                clearInterval(intervalId);
            };
        }, 15);
    };
};

const ball = new Ball();

window.onload = ball.moveBall();

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

function updateCanvas() {
    ctx.clearRect(0,0,canvas.width, canvas.height);

    drawNet();
    player1.draw();
    player2.draw();
    ball.draw();
};