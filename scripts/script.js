const canvas = document.getElementById('project');
const ctx = canvas.getContext('2d');

// Start instruction:
ctx.font = "30px Arial";
ctx.fillStyle = "#c0c0c0";
ctx.fillText("PRESS ENTER TO START", 450, 340);

// Control instructions
// 1. Draw buttons:
ctx.fillStyle = "#4E4C49";
ctx.fillRect(200, 250, 40, 40);
ctx.fillRect(200, 300, 40, 40);
ctx.fillRect(1050, 250, 40, 40);
ctx.fillRect(1050, 300, 40, 40);

// 2. Fill the buttons with appropriate key:
ctx.fillStyle = "white";
// 2.1 Write "w" and "s" keys:
ctx.fillText("w", 208, 280);
ctx.fillText("s", 212, 328);
ctx.beginPath();
// 2.2 Draw "ArrowUp" key:
ctx.moveTo(1070, 265);
ctx.lineTo(1075, 270);
ctx.lineTo(1065, 270);
ctx.lineTo(1070, 265);
ctx.moveTo(1070, 270);
ctx.lineTo(1070, 278);
// 2.3 Draw "ArrowDown" key:
ctx.moveTo(1070, 312);
ctx.lineTo(1070, 320);
ctx.lineTo(1075, 320);
ctx.lineTo(1070, 325);
ctx.lineTo(1065, 320);
ctx.lineTo(1070, 320);
ctx.fillStyle = "white";
ctx.fill();
ctx.strokeStyle = "white";
ctx.stroke();
ctx.closePath();

// 3. Write controls:
ctx.font = "25px Arial";
ctx.fillText("CONTROLS", 160, 235);
ctx.fillText("CONTROLS", 1010, 235);

const drawGameArea = () => {
    // Create the texts "Player1" and "Player2" on canvas:
    ctx.font = "30px serif";
    ctx.fillStyle = "white";
    ctx.fillText("Player 1", 20, 50);
    ctx.fillText("Player 2", 1160, 50);

    // Draw the net no the canvas:
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, 600);
    ctx.lineWidth = 4;
    ctx.setLineDash([5, 3]);
    ctx.strokeStyle = "white";
    ctx.stroke();
    ctx.closePath();
};

drawGameArea();

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
        this.points = 0;
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
        super(630, 290, 20, 20, -2);
        this.speedX = 8;
        this.initialX = 630;
        this.initialY = 290;
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

        // Bounce if ball touch player:
        if(crashedPlayer1 || crashedPlayer2) {
            this.speedX = -this.speedX;
        };

        const touchTop = (this.positionY + this.speedY) < 0;
        const touchBottom = (this.positionY + this.speedY) > (canvas.height - this.height);

        // Bounce if ball touch the top or the bottom of the canvas:
        if(touchTop || touchBottom) {
            this.speedY = -this.speedY;
        };

        this.positionX += this.speedX;
        this.positionY += this.speedY;
    };

    moveBall() {
        setTimeout(() => {
            const intervalId = setInterval(() => {
                this.newPosition();

                const crossedRightGoal = this.positionX > canvas.width;
                const crossedLeftGoal = this.positionX < (0 - this.width);

                // Return ball to its initial position:
                if (crossedRightGoal || crossedLeftGoal) {
                    setTimeout(() => {
                        this.positionX = this.initialX;
                        this.positionY = this.initialY;
                    }, 500);
                };
    
                const player1Won = player1.points > 3;
                const player2Won = player2.points > 3;

                // Stop the function if one of the players has won:
                if (player1Won || player2Won) {
                    clearInterval(intervalId);
                };
            }, 15);
        }, 500);
    };
};

const ball = new Ball();

ball.draw();

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
                break;
            case "Enter":
                // RestartGame
                if (player1.points > 3 || player2.points > 3) {
                    ball.positionX = ball.initialX;
                    ball.positionY = ball.initialY;
                    player1.points = 0;
                    player2.points = 0;
                    ball.moveBall();
                };
        };
        updateCanvas();
    });
    const startGame = (e) => {
        if (e.key === "Enter") {
            ball.moveBall();
            document.removeEventListener("keydown", startGame);
        };
    };

    document.addEventListener("keydown", startGame);
});

function printScore() {
    ctx.font = '40px serif';
    ctx.fillStyle = 'white';
    ctx.fillText(`${player1.points}`, 595, 50);

    ctx.font = '40px serif';
    ctx.fillStyle = 'white';
    ctx.fillText(`${player2.points}`, 660, 50);
};

printScore();

function checkScore() {
    const crossedRightGoal = ball.positionX > (canvas.width + 260);
    const crossedLeftGoal = ball.positionX < (0 - ball.width - 260);

    if (crossedRightGoal) {
        player1.points += 1;
    };
    if (crossedLeftGoal) {
        player2.points += 1;
    };
    ctx.clearRect(0,0,canvas.width, canvas.height);
    printScore();
};

function checkWinner() {
    const player1Won = (player1.points > 3);
    const player2Won = (player2.points > 3);

    if (player1Won || player2Won) {
        // Restart instruction:
        ctx.font = "30px Arial";
        ctx.fillStyle = "white";
        ctx.fillText("PRESS ENTER TO RESTART", 450, 340);
    };

    ctx.font = "50px serif";
    ctx.fillStyle = "red";

    if (player1Won) {
        // Congratulation message:
        ctx.fillText("PLAYER 1 HAS WON!", 400, canvas.height / 2);
    };
    if (player2Won) {
        // Congratulation message:
        ctx.fillText("PLAYER 2 HAS WON!", 400, canvas.height / 2);
    };
};

function updateCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    checkScore();
    drawGameArea();
    player1.draw();
    player2.draw();
    ball.draw();
    checkWinner();
};