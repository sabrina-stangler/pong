// const e = require("express");

const p1 = 'blue-paddle';
const p2 = 'red-paddle';
const ball = 'ball';



app.onInit = function(){
    this.nodes.push({
        id : p1,
        x  : 100,
        y  : 0,
        width  : 10,
        height : 100,
        color  : 'red',
        direction : 0
    });

    this.nodes.push({
        id : p2,
        x  : 50,
        y  : 0,
        width  : 10,
        height : 100,
        color  : 'blue'
    });

    this.nodes.push({
        id : ball,
        x  : 150,
        y  : 0,
        width  : 10,
        height : 10,
        color  : 'black'
    });

    document.onkeydown = handleKeys;
    
    function p1UpHandler() {
        app.getNode(p1).y-=10;
    }

    function p1DownHandler() {
        app.getNode(p1).y+=10;
    }

    function p2UpHandler() {
        app.getNode(p2).y-=30;
    }

    function p2DownHandler() {
        app.getNode(p2).y+=30;
    }

    function handleKeys(ev) {
        const callback = {
            "KeyW"       : p1UpHandler,
            "KeyS"       : p1DownHandler,
            "ArrowUp"    : p2UpHandler,
            "ArrowDown"  : p2DownHandler,
        }[ev.code];
        callback?.();
    }
};


app.onUpdate = function(time){
    this.getNode(ball).x++;
};