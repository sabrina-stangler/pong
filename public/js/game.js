const width = window.innerWidth - 20;
const height = window.innerHeight - 50;
const p1 = 'blue-paddle';
const p1X = 100;
const p2 = 'red-paddle';
const p2X = width - 100;
const paddleHeight = 200;
const paddleWidth = 10;
const playerSpeed = height / 50 + (50 / width);
const ball = 'ball';
const ballDiameter = 10;
const ballSpeed = playerSpeed / 5;
const canvas = 'canvas';
var p1Score = 0;
var p2Score = 0;

app.onInit = function(){
    document.body.children[canvas].setAttribute('width', width);
    document.body.children[canvas].setAttribute('height', height);

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
        direction : 0,
        ydirection: 0
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
    
    p1Score = 0;
    p2Score = 0;
};

app.onUpdate = function(time){
    setupCanvas();

    moveBall();

    handleScoring();

    handlePaddleCollisions();
};

function startGameHandler() {
    var ballObj = app.getNode(ball);
    ballObj.x = width / 2;
    ballObj.y = height / 2;
    ballObj.direction = Math.random() > 0.5 ? -1 : 1;
    ballObj.ydirection = Math.random() > 0.5 ? -1 : 1;
}

function setupCanvas() {
    var canvasObj = document.body.children[canvas];
    const context = canvasObj.getContext('2d');
    context.clearRect(0, 0, canvasObj.width, canvasObj.height);
}
    
function p1UpHandler() {
    var player = app.getNode(p1);
    if (player.y > 0 || player.y > playerSpeed)
        player.y -= playerSpeed;
}

function p1DownHandler() {
    var player = app.getNode(p1);
    if (player.y + paddleHeight < height || player.y + paddleHeight < height - playerSpeed)
        player.y += playerSpeed;
}

function p2UpHandler() {
    var player = app.getNode(p2);
    if (player.y > 0 || player.y > playerSpeed)
        player.y -= playerSpeed;
}

function p2DownHandler() {
    var player = app.getNode(p2);
    if (player.y + paddleHeight < height || player.y + paddleHeight < height - playerSpeed)
        player.y += playerSpeed;
}

function moveBall() {
    var ballObj = app.getNode(ball);
    ballObj.x += (ballObj.direction * ballSpeed);
    ballObj.y += (ballObj.ydirection * ballSpeed);

    // Keep it in vertical bounds
    if (ballObj.y <= 0 || ballObj.y >= height)
        ballObj.ydirection *= -1;

}

function handleScoring() {
    var ballObj = app.getNode(ball);
    if (ballObj !== null && ballObj.x !== null && ballObj.y !== null) {
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
}

function logScore(lastScorer) {
    console.log('~~ ' + lastScorer + ' just scored! ~~');
    console.log('P1: ' + p1Score);
    console.log('P2: ' + p2Score);

    document.getElementById('p1Score').innerHTML = p1Score;
    document.getElementById('p2Score').innerHTML = p2Score;
}

function handlePaddleCollisions() {
    var ballObj = app.getNode(ball);
    var p1Obj = app.getNode(p1);
    var p2Obj = app.getNode(p2);
    
    if ((ballObj.x < (p1Obj.x + paddleWidth)) && (ballObj.y + ballDiameter >= p1Obj.y && ballObj.y <= p1Obj.y + paddleHeight)) {
        reverseX(ballObj);
        adjustY(ballObj, p1Obj);
    } else if ((ballObj.x > (p2Obj.x - paddleWidth)) && (ballObj.y + ballDiameter >= p2Obj.y && ballObj.y <= p2Obj.y + paddleHeight)) {
        reverseX(ballObj);
        adjustY(ballObj, p2Obj);
    }
}

function reverseX(ball) {
    ball.direction = ball.direction * -1;
}

function adjustY(ball, paddle) {
    const scalar = ((ball.y - paddle.y) - (paddleHeight / 2)) / 100;
    ball.ydirection += scalar;
}