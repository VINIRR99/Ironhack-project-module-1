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
##### _Capturei o canvas:_
```sh
const canvas = document.getElementById('project');
const ctx = canvas.getContext('2d');
```
##### _Desenhei uma linha tracejada no meio do canvas com a intenção de imitar uma rede de quadra de tênis:_
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
##### _Classe Player_
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
##### _Criei o objeto ball_
- Criei a bola do jogo usando um objeto:
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
##### _Começo da criação da classe Rectangle_
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
# 2º commit
### _classe Rectangle finalizado:_
- Criei a classe Rectangle, que será usado para criar os jogadores e a bola do jogo. Mas nessa classe eu não inclui speedX, já que somente a posição da bola no eixo x que será alterado, a posição dos jogadores no eixo x é constante:
```sh
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
```
### _Alterei a classe Player_
- Dessa vez a classe player irá herdar os elementos positionX, positionY, width, height e speedY, assim como a função draw(), da classe Rectangle. Todos os outros elementos tem número inicial fixo, exceto positionX, que precisará de um argumento para criar os jogadores.
```sh
class Player extends Rectangle {
    constructor(positionX) {
        super(positionX, 265, 20, 70, 0);
    };
};
```
### _Classe ball_
- Apaguei o objeto ball, e criei a classe Ball, que herdará os elementos e a função draw() da classe Rectangle:
```sh
class Ball extends Rectangle {
    constructor() {
        super(615, 290, 20, 20, 0);
    };
};
```
- Criei o elemento speedX na classe Ball, já que a positionX da bola será alterada no jogo, e seu valor inicial é zero:
```sh
class Ball extends Rectangle {
    constructor() {
        super(615, 290, 20, 20, 0);
        this.speedX = 0;
    };
};
```
- Criei o objeto ball, usando a classe Ball:
```sh
const ball = new Ball();
```
### _Funções de movimento dos jogadores_
- Adicionei a função moveUp() na classe Player, que será usado para, que será usado para alterar a posição dos jogadores quando der um comando para eles irem para cima. Quando acionada, essa função limpa o jogador da tela, atribui uma velocidade fixa ao speedY, subtrai o valor do speedY da positionY, e desenha o jogador novamento em sua nova posição:
```sh
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
};
```
- Adicionei a função moveDown() a classe Player, que faz as mesmas ações da função moveUp(), com a única diferença que adiciona o valor de speedY ao positionY, em vez de subtrair:
```sh
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
```
### _addEventListener_
- Adicionei um addEventLinstener. Sua função é chamar as funções moveUp() e moveDown() dependendo da tecla que o usuário clicar no teclado;
- Se o usuário clicar a tecla "w", a função moveUp() será acionada no player1;
- Se o usuário clicar a tecla "s", a função moveDown() será acionada no player1;
- Se o usuário clicar a tecla "ArrowUp" (seta para cima), a função moveUp() será acionada no player2;
- Se o usuário clicar a tecla "ArrowDown" (seta para baixo), a função moveDown() será acionada no player2;
```sh
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
```
# 3º commit
### _Alterações na classe Player, alterações no addEventListener e criação de updateCanvas_
- Alterei os métodos moveUp() e moveDown() para os jogadores não ultrapassarem a borda do canvas;
- Retirei os métodos clearRect e this.draw() de moveUp() e moveDown() e coloquei na função function updateCanvas();
- Chamei updateCanvas() dentro da função addEventListener ("keyDown") para limpar os canvas e desenhar os elementos do canvas toda vez que uma tecla acione o evento;
```sh
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
```
```sh
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
```
```sh
function updateCanvas() {
    ctx.clearRect(0,0,canvas.width, canvas.height);

    drawNet();
    player1.draw();
    player2.draw();
    ball.draw();
};
```
### _Alterações na classe Ball_
- Criei a função move(), que usará um setInterval para repetidamente desenhar a bola em movimento, por enquanto só dará um update no canvas:
```sh
class Ball extends Rectangle {
    constructor() {
        super(615, 290, 20, 20, 0);
        this.speedX = 0;
        this.angle = 180;
    };
    move() {
        const intervalId = setInterval(() => {
            updateCanvas();
        }, 10);
    };
};
```
- Depois criei a função newPosition que será usado para determinar a nova posição da bola. Tentei fazer com que a bola quicar quando chocasse com o top e o bottom da borda do canvas, mas quando testei não deu certo, então está incompleto:
```sh
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
```
- Meu teste da função move() criada na classe Ball:
```sh
ball.move();
```
# 4º commit
### _Alteração na classe Rectangle_
- Finalmente descobri porque a bola não se movia do jeito que devia. Eu erroneamente coloquei o this.speedY = 0, o que impossibilitava futuras alterações. Alterei isso e coloquei this.speedY = speedY, e adicionei o speedY ao construtor:
```sh
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
};
```
### _Alteração classe Ball_
##### _Com a orientação dos seguintes sites:_
https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript/Move_the_ball
https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript/Bounce_off_the_walls
- Defini os valores de speedX e speedY.
##### _Criei a função newPosition():_
- Que contém a função updateCanvas() que irá apagar o canvas depois desenha-lo novamente;
- contém duas condições que altera o valor das velocidades no case de a bola chocar com uma das bordas do canvas, com o objetivo de fazê-la quicar;
- adiciona as velocidades às posições no canvas para altera-lase causar o movimento.
```sh
class Ball extends Rectangle {
    constructor() {
        super(615, 290, 20, 20, -2);
        this.speedX = 2;
    };

    newPosition() {
        updateCanvas();

        if((this.positionX + this.speedX) > (canvas.width - this.width) || (this.positionX + this.speedX) < 0) {
            this.speedX = -this.speedX;
        };
        if((this.positionY + this.speedY) > (canvas.height - this.height) || (this.positionY + this.speedY) < 0) {
            this.speedY = -this.speedY;
        };

        this.positionX += this.speedX;
        this.positionY += this.speedY;
    };
};
```
##### _Criei a função moveBall()_
- Que ativa a função newPosition() em um setInterval para a função newPosition() repetir a cada 15 milissegundos:
```sh
class Ball extends Rectangle {
    constructor() {
        super(615, 290, 20, 20, -2);
        this.speedX = 2;
    };

    newPosition() {
        updateCanvas();

        if((this.positionX + this.speedX) > (canvas.width - this.width) || (this.positionX + this.speedX) < 0) {
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
        }, 15);
    };
};
```
- Depois ativei a função moveBall() assim que a página carregar:
```sh
window.onload = ball.moveBall();
```
### _Alteração classe Player_
- Somente alterei as velocidades dos players de 8 para 20:
```sh
class Player extends Rectangle {
    constructor(positionX) {
        super(positionX, 265, 20, 70, 0);
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
```
# 5º commit
### _Alterações na classe Ball_
- Criei a função crashWith com a intenção de usa-la para mudar a direção da bola quando ela chocar com os jogadores;
- Mudei o primeiro condicional da função newPosition() para checar se a bola choca com algum dos jogadores, se sim, a bola deve mudar de direção
- Adicionei um clearInterval na função moveBall() para essa função parar de repetir se a bola sair do campo de visão do canvas;
- Mudei as velocidades de speedX e speedY.
```sh
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
```