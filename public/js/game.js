const width = window.innerWidth - 20;
const height = window.innerHeight - 20;
const p1 = 'blue-paddle';
const p1X = 100;
const p2 = 'red-paddle';
const p2X = width - 100;
const paddleHeight = 100;
const paddleWidth = 10;
const playerSpeed = height / 50 + (50 / width);
const ball = 'ball';
const ballDiameter = 10;
const ballSpeed = playerSpeed / 4;
const canvas = 'canvas';
var p1Score = 0;
var p2Score = 0;

app.onInit = function(){
    document.body.children[canvas].setAttribute('width', width);
    document.body.children[canvas].setAttribute('height', height);

    p1Score = 0;
    p2Score = 0;

    this.nodes.push({
        id : p1,
        x  : p1X,
        y  : height / 2  - paddleHeight / 2,
        width  : paddleWidth,
        height : paddleHeight,
        color  : 'red',
        direction : 0
    });

    this.nodes.push({
        id : p2,
        x  : p2X,
        y  : height / 2 - paddleHeight / 2,
        width  : paddleWidth,
        height : paddleHeight,
        color  : 'blue',
        direction : 0
    });

    this.nodes.push({
        id : ball,
        x  : width / 2,
        y  : height / 2,
        width  : ballDiameter,
        height : ballDiameter,
        color  : 'gray',
        direction : 0
    });

    document.onkeydown = handleKeys;

    function handleKeys(ev) {
        const callback = {
            "KeyW"       : p1UpHandler,
            "KeyS"       : p1DownHandler,
            "ArrowUp"    : p2UpHandler,
            "ArrowDown"  : p2DownHandler,
            "Space"      : startGameHandler,
        }[ev.code];
        callback?.();
    }
};

app.onUpdate = function(time){
    setupCanvas();

    moveBall();

    handleScoring();

    handleBallCollisions();
};

function startGameHandler() {
    app.getNode(ball).x = width / 2;
    app.getNode(ball).y = height / 2;
    app.getNode(ball).direction = Math.random() > 0.5 ? -1 : 1;
    app.getNode(ball).x+=app.getNode(ball).direction;
}

function setupCanvas() {
    var canvasObj = document.body.children[canvas];
    const context = canvasObj.getContext('2d');
    context.clearRect(0, 0, canvasObj.width, canvasObj.height);
}
    
function p1UpHandler() {
    var player = app.getNode(p1);
    if (player.y > 0 || player.y > playerSpeed)
        player.y-=playerSpeed;
}

function p1DownHandler() {
    var player = app.getNode(p1);
    if (player.y + paddleHeight < height || player.y + paddleHeight < height - playerSpeed)
        player.y+=playerSpeed;
}

function p2UpHandler() {
    var player = app.getNode(p2);
    if (player.y > 0 || player.y > playerSpeed)
        player.y-=playerSpeed;
}

function p2DownHandler() {
    var player = app.getNode(p2);
    if (player.y + paddleHeight < height || player.y + paddleHeight < height - playerSpeed)
        player.y+=playerSpeed;
}

function moveBall() {
    app.getNode(ball).x+=(app.getNode(ball).direction * ballSpeed);
}

function handleScoring() {
    var ballObj = app.getNode(ball);
    if (ballObj.x < p1X - paddleWidth) {
        startGameHandler();
        p2Score++;
        logScore('P2');
    } else if (ballObj.x > p2X + paddleWidth) {
        startGameHandler();
        p1Score++;
        logScore('P1');
    }
}

function logScore(lastScorer) {
    console.log('~~ ' + lastScorer + ' just scored! ~~');
    console.log('P1: ' + p1Score);
    console.log('P2: ' + p2Score);
}

function handleBallCollisions() {
    /*
     * If ball hits paddle, reverse x direction
     * If ball hits paddle, do some funky magic with y direction to make it bounce according to where on the paddle
     */
}