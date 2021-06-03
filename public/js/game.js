const p1 = 'red-paddle';
const p2 = 'blue-paddle';
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
};

app.onUpdate = function(time){
    this.getNode(ball).x++;
};