Obs: desculpa, não entendi porque veio um monte de explicação de código em uma linha só.

*Por Enquanto o que fiz foi usar o CSS para:
1. determinar o ba ckground color do body e do canvas para ficar parecido com uma quadra de basquete:
body {
    background-color: red;
}

canvas {
    background-color: #035806;
}
2. e coloque borda no top e no bottom do canvas para mostrar o limite de onde a bola do jogo pode bater:
canvas {
    border: solid white;
    border-width: 10px 0;
    background-color: #035806;
}

*Usei o canvas para criar uma linha tracejada no meio do canvas para simular uma rede de quadra:
ctx.beginPath();
ctx.moveTo(638, 0);
ctx.lineTo(638, 600);
ctx.lineWidth = 4;
ctx.setLineDash([5, 3]);
ctx.strokeStyle = "white";
ctx.stroke();
ctx.closePath();

*Criei os jogadores usando uma classe:
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

*Criei a bola do jogo usando um objeto:
const ball = {
    positionX: 615,
    positionY: 290,
    draw () {
        ctx.fillStyle = 'white';
        ctx.fillRect(this.positionX, this.positionY, 20, 20);
    },
};

*Criei os objetos player1, player2 usando a clase Player:
const player1 = new Player(20);
const player2 = new Player(1240);

*Desenhei os jogadores usando a função draw() que está na classe Player:
player1.draw();
player2.draw();

*Desenhei a bola usando a função draw() que novamente eu criei no objeto ball:
ball.draw();

*E como tinha muito código repetitivo comecei a criar a classe Rectangle e depois eu vou usar essa classe para criar
a classe Player, os objetos player1, player2 e ball. Mas por enquanto está incompleta por isso está comentada:
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
