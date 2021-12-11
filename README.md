# 1º commit
### _Alterações no index.html_
- Adicionei um código inicial padrão no HTML;
- Adicionei o título Pong (que é o nome no jogo) na tag <title>;
- Conectei o styles/style.css ao index.html na tag <link>;
- Conectei o scripts/script.js ao indext.html na tag <script>
- Criei o canvas, dei uma id igual a "project", um width de "1280", e um height de "600";
### _Alterações no styles/style.css_
- Adicionei um backgorund color ao body e ao canvas com a intenção de imitar uma quadra de tênis:
```sh
body {
    background-color: red;
}

canvas {
    background-color: #035806;
}
```
- Adicionei ao canvas borda no top e no bottom para mostrar o limite de onde a bola do jogo e os jogadores podem bater:
```sh
canvas {
    border: solid white;
    border-width: 10px 0;
    background-color: #035806;
}
```
### _Código no scripts/script.js_
- Capturei o canvas:
```sh
const canvas = document.getElementById('project');
const ctx = canvas.getContext('2d');
```
- Desenhei uma linha tracejada no meio do canvas com a intenção de imitar uma rede de quadra de tênis:
```sh
ctx.beginPath();
ctx.moveTo(638, 0);
ctx.lineTo(638, 600);
ctx.lineWidth = 4;
ctx.setLineDash([5, 3]);
ctx.strokeStyle = "white";
ctx.stroke();
ctx.closePath();
```
- Criei a classe Player que será dois retângulos, que no caso representará os dois jogadores no jogo de Pong. Como ambos os jogadores tem as posicões no y inicial e suas velocidades iniciais iguais, já coloquei elas na classe, somente a posição no x que altera:
```sh
class Player {
    constructor(positionX) {
        this.positionX = positionX;
        this.positionY = 265;
        this.speedX = 0;
        this.speedY = 0;
    };
};
```
- Adicionei a função draw() a classe Player, que será usado para desenhar os jogadores no canvas:
```sh
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
```
- Criei os jogadores (que são objetos) usando a classe Player:
```sh
const player1 = new Player(20);
const player2 = new Player(1240);
```
- Desenhei os jogadores usando a função draw() que está na classe Player:
```sh
player1.draw();
player2.draw();
```
- Crie a bola do jogo usando um objeto:
```sh
const player1 = new Player(20);
const player2 = new Player(1240);
```
- Desenhei os jogadores usando a função draw() que está na classe Player:
```sh
const ball = {
    positionX: 615,
    positionY: 290,
    draw () {
        ctx.fillStyle = 'white';
        ctx.fillRect(this.positionX, this.positionY, 20, 20);
    },
};
```
- Desenhei a bola do jogo usando a função draw() criada no objeto ball:
```sh
ball.draw();
```
- E como tem códigos repetitivos comecei a criar a classe Rectangle para depois usar essa classe para criar a classe Player, os objetos player1, player2 e ball. Mas por enquanto está incompleta por isso está comentada:
```sh
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
```
