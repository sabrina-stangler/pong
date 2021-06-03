const p1 = 'blue-paddle';
const p2 = 'red-paddle';
const paddleHeight = 100;
const paddleWidth = 10;
const ball = 'ball';
const canvas = 'canvas';
var width = window.innerWidth - 20;
var height = window.innerHeight - 20;

app.onInit = function(){
    document.body.children[canvas].setAttribute('width', width);
    document.body.children[canvas].setAttribute('height', height);

    this.nodes.push({
        id : p1,
        x  : 100,
        y  : height / 2  - paddleHeight / 2,
        width  : paddleWidth,
        height : paddleHeight,
        color  : 'red',
        direction : 0
    });

    this.nodes.push({
        id : p2,
        x  : width - 100,
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
        width  : 10,
        height : 10,
        color  : 'gray',
        direction : 0
    });

    document.onkeydown = handleKeys;
    
    function p1UpHandler() {
        app.getNode(p1).y-=30;
    }

    function p1DownHandler() {
        app.getNode(p1).y+=30;
    }

    function p2UpHandler() {
        app.getNode(p2).y-=30;
    }

    function p2DownHandler() {
        app.getNode(p2).y+=30;
    }

    function startGameHandler() {
        app.getNode(ball).x = width / 2;
        app.getNode(ball).y = height / 2;
        app.getNode(ball).direction = Math.random() > 0.5 ? -1 : 1;
        app.getNode(ball).x+=app.getNode(ball).direction;
    }

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
    var canvasObj = document.body.children[canvas];
    const context = canvasObj.getContext('2d');
    context.clearRect(0, 0, canvasObj.width, canvasObj.height);

    app.getNode(ball).x+=(app.getNode(ball).direction*5);
};