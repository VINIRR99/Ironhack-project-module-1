# Site do jogo
https://vinirr99.github.io/Ironhack-project-module-1/
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
# 6º commit
### _Alteração na classe Ball_
##### _Pequenas alterações na função newPosition()_
- Criei a variável touchTop que guardará a condição para se a bola chocar com a borda de cima do canvas, e a coloquei na condição para que a bola mude de direção ao toque;
- Criei a variável touchBottom que guardará a condição para se a bola chocar com a borda de baixo do canvas, e a coloquei na condição para que a bola mude de direção ao toque;
##### _Alteração na função moveBall()_
- Criei uma condição para que se a bola ultrapassar um dos gols, ela retornará a sua posição inicial, e coloquei ela dentro de um setInterval para que a bola não se mova imediatament após cruzar o gol;
- Alterei a condição para que a função moveBall() pare de se repetir. Na condição eu coloquei duas condiçoes para usar o clearInterval, que um dos jogadores tenha uma pontuação maior que 3, sendo esse o vencedor
##### _Adicionei dois elementos_
- initialX e initialY, que usarei para colocar como valor as positionX e positionY se precisar:
```sh
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
```
### _Alteração classe Player_
- Adicionei o elemento points para guardar as pontuções dos jogadores. Suas pontuações iniciais é igual a zero:
```sh
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
```
### _Criei a função printScore_
- Será usado para escrever no canvas a pontuação dos jogadores. 
```sh
function printScore() {
    ctx.font = '40px serif';
    ctx.fillStyle = 'white';
    ctx.fillText(`${player1.points}`, 595, 50);

    ctx.font = '40px serif';
    ctx.fillStyle = 'white';
    ctx.fillText(`${player2.points}`, 660, 50);
};
```
- Depois eu ativei essa função par já ter a pontuação dos jogadores na tela inicial:
```sh
printScore();
```
### _Criei a função checkScore(), e nela tem duas condições_
- Se a bola atravessar o gol direito, deve-se adicionar 1 ponto ao jogador 1;
- Se a bola atravessar o gol esquerdo, deve-se adicionar 1 ponto ao jogador 2;
- Assim que as duas condições forem checadas, será usado um clearRect para limpar o canvas, e de novo ativar a função printScore() para escrever a nova pontuação dos jogadores:
```sh
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
```
- - A função será ativada dentro da função updateCanvas:
```sh
function updateCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    checkScore();
    drawNet();
    player1.draw();
    player2.draw();
    ball.draw();
};
```
### _Criei a função checkWinner()_
- Essa função será usada para escrever dois textos no canvas;
- Se o jogador 1 ganhar (se sua pontuação for maior que 3), aparecerá na tela "PLAYER 1 HAS WON";
- Se o jogador 2 ganhar (se sua pontuação for maior que 3), aparecerá na tela "PLAYER 2 HAS WON";
- Se qualquer um dos jogadores ganhar, aparecerá na tela "PRESS ENTER TO RESTART":
```sh
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
```
- Ativei essa função na função updateCanvas():
```sh
function updateCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    checkScore();
    drawNet();
    player1.draw();
    player2.draw();
    ball.draw();
    checkWinner();
};
```
### _Alteração no método addEventListener()_
##### _Adicionei dois usos para a tecla "Enter";_
- Para dar Start no game. Se o usuário apertar "Enter", será ativado a função moveBall() do objeto ball, fazendo com que a bola se mova dando início ao jogo. Adicionei o método removeEventListener dentro da função startGame(), que será usado para remover a função startGame() para que não seja possível acionar a função moveBall() novamente;
- Para dar restart no game. Criei outra condição no addEventListener já criado para dar movimento aos jogadores, e de novo usei a tecla "Enter". Se o usuário teclar "Enter" mais de uma vez, só acontecerá outra ação quando um dos jogadores ganhar. Se um dos jogadores ganhar e a tecla "Enter" for usada: a posição da bola será mudada para sua posição inicial, a pontuação dos jogadores será igualado a zero, e será ativado a função moveBall() dando reinício ao jogo:
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
```
### _Alteração na função drawNet()_
- Adicionei dois textos ao Canvas para indicar quem é o player 1 e o player2;
- Acima do player1 tem o texo "Player 1";
- Acima do player2 tem o texto "Player 2";
- Mudei o nome da função para drawGameArea;
```sh
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
```
- Ativei a função:
```sh
drawGameArea();
```
- Ativei de novo no updateCanvas():
```sh
function updateCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    checkScore();
    drawGameArea();
    player1.draw();
    player2.draw();
    ball.draw();
    checkWinner();
};
```
### _Desenhei instruções para a tela inicial_
- Essas instruções serão apagados quando o usuário der start no jogo;
- Contém instrução de como dar start no jogo e instruções dos controles de movimentação dos jogadores:
```sh
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
```
# 7º commit
### _Alteração na classe Player, criação da função playersText() e alteração no método addEventListener()_
- Fiz essas alterações porque toda vez que uma tecla era clicada, a função updateCanvas() era ativada, apagando a tela de instroções inicial, antes de começar o jogo (o começo do jogo é quando a função ball.moveBall() é acionada). Então tirei a função updateCanvas() d addEventListener.
##### _Alteração nas funções moveUp() e moceDown()_
- Adicionei os mesmos códigos nas duas funções;
- Adicionei um cleaRect() para limpar a posição anterior dos jogadores antes de mudar suas posições.
```sh
class Player extends Rectangle {
    constructor(positionX) {
        super(positionX, 265, 20, 90, 0);
        this.points = 0;
    };

    moveUp() {
        ctx.clearRect(this.positionX, this.positionY, this.width, this.height);

        if (this.positionY > 0) {
            this.speedY = 20;
        } else {
            this.speedY = 0;
        };
        this.positionY -= this.speedY;
    };

    moveDown() {
        ctx.clearRect(this.positionX, this.positionY, this.width, this.height);

        if (this.positionY < (canvas.height - this.height)) {
            this.speedY = 20;
        } else {
            this.speedY = 0;
        };
        this.positionY += this.speedY;
    };
};
```
##### _Criei a função playersText()_
- Criei essa função para escrever "Player 1" e "Player 2" no canvas após ela ser apagada no addEventListener():
```sh
const playersText = () => {
    ctx.font = "30px serif";
    ctx.fillStyle = "white";
    ctx.fillText("Player 1", 20, 50);
    ctx.fillText("Player 2", 1160, 50);
};
```
- Ativei essa função dentro de drawGameArea() e addEventListener().
##### _Alteração no método addEventListener()_
- Removi a função updateCanvas();
- Adicionei dois clearRect() para apagar os textos criados por playersText();
- Depois do condicional usado para determinar as teclas de comando dos jogadores, ativei a função playersText() para escrever os textos novament e usei a função draw() nos dois jogadores;
- Mudei a condição para dar restart no game para se um dos jogadores atingir 5 pontos:
```sh
window.addEventListener("load", () => {
    document.addEventListener("keydown", (e) => {
        // Clean the players text
        ctx.clearRect(20, 28, 100, 30);
        ctx.clearRect(1160, 28, 100, 30);
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
                const player1Won = (player1.points > 4);
                const player2Won = (player2.points > 4);

                if (player1.points > 3 || player2.points > 3) {
                    ball.positionX = ball.initialX;
                    ball.positionY = ball.initialY;
                    player1.points = 0;
                    player2.points = 0;
                    ball.moveBall();
                };
        };
        player1.draw();
        player2.draw();
        playersText();
    });
    const startGame = (e) => {
        if (e.key === "Enter") {
            ball.moveBall();
            document.removeEventListener("keydown", startGame);
        };
    };

    document.addEventListener("keydown", startGame);
});
```
### _Alteração na classe Ball_
- Aleterei a condição dentro da função moveBall() para acionar o clearInterval;
- Anteriormente se um dos jogadores conseguisse 4 pontos, o clearInterval() era acionado, agora se um dos jogadores conseguir 5 pontos ela é ativada;
- També aumentei os valores de speedX e speedY para aumentar a velocidade da bola:
```sh
class Ball extends Rectangle {
    constructor() {
        super(630, 290, 20, 20, -3);
        this.speedX = 13;
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
    
                const player1Won = player1.points > 4;
                const player2Won = player2.points > 4;

                // Stop the function if one of the players has won:
                if (player1Won || player2Won) {
                    clearInterval(intervalId);
                };
            }, 15);
        }, 500);
    };
};
```
- Na função checkWinner() fiz a mesma coisa:
```sh
function checkWinner() {
    const player1Won = (player1.points > 4);
    const player2Won = (player2.points > 4);

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
```
# 8º commit
### _Com a ajuda do seguinte site, consegui fazer os dois jogadores se moverem ao mesmo tempo_
https://medium.com/@dovern42/handling-multiple-key-presses-at-once-in-vanilla-javascript-for-game-controllers-6dcacae931b7
##### _Criei um array na variável controllers para ser usado para criar o movimento dos jogadores_
```sh
const controllers = [
    {keyCode: 87, pressed: false, func() {player1.moveUp()}},
    {keyCode: 83, pressed: false, func() {player1.moveDown()}},
    {keyCode: 38, pressed: false, func() {player2.moveUp()}},
    {keyCode: 40, pressed: false, func() {player2.moveDown()}},
];
```
##### _Alterei o addEventeListener para alterar o valor da chave pressed de acordo com os comandos do usuário_
- Também adicionei um addEventListener "keyup" para mudar o valor de pressed para false novamente assim que o usuário retirar o dedo da tecla de comando:
```sh
window.addEventListener("load", () => {
    document.addEventListener("keydown", (e) => {
        // Clean the players text
        ctx.clearRect(20, 28, 100, 30);
        ctx.clearRect(1160, 28, 100, 30);
        switch (e.keyCode) {
            case controllers[0].keyCode:
                controllers[0].pressed = true;
                break;
            case controllers[1].keyCode:
                controllers[1].pressed = true;
                break;
            case controllers[2].keyCode:
                controllers[2].pressed = true;
                break;
            case controllers[3].keyCode:
                controllers[3].pressed = true;
                break;
            case 13:
                // RestartGame
                const player1Won = (player1.points > 4);
                const player2Won = (player2.points > 4);

                if (player1Won || player2Won) {
                    ball.positionX = ball.initialX;
                    ball.positionY = ball.initialY;
                    player1.points = 0;
                    player2.points = 0;
                    ball.moveBall();
                };
        };
        updateCanvas();
    });
    document.addEventListener("keyup", (e) => {
        switch (e.keyCode) {
            case controllers[0].keyCode:
                controllers[0].pressed = false;
                break;
            case controllers[1].keyCode:
                controllers[1].pressed = false;
                break;
            case controllers[2].keyCode:
                controllers[2].pressed = false;
                break;
            case controllers[3].keyCode:
                controllers[3].pressed = false;
        };
    });

    const startGame = (e) => {
        if (e.key === "Enter") {
            ball.moveBall();
            document.removeEventListener("keydown", startGame);
        };
    };

    document.addEventListener("keydown", startGame);
});
```
##### _Criei a função executeMove() para executar a função func() toda vez que pressed for verdadeiro_
```sh
function executeMoves() {
    controllers.map(controller => {
      if (controller.pressed === true) {
          controller.func();
        };
    });
};
```
##### _Ativei a função executeMoves() à função updateCanvas()_
```sh
function updateCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    executeMoves();
    checkScore();
    drawGameArea();
    player1.draw();
    player2.draw();
    ball.draw();
    checkWinner();
};
```