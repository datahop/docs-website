var usersContainer = document.getElementById('users-animation-container');
var usersContainerWidth = usersContainer.offsetWidth;

view.viewSize = new Size(usersContainerWidth, usersContainerWidth);

window.addEventListener('resize', onResize, false);

//colors
var yellow = '#f2e05f';
var dark = '#2e343a';
var light = '#f8f8f8';

var dotsCount = 12;
var dotRadius = 1.5;
var offset = 0.04;
var maxDistance = view.size.height / 2;
var xArray = [];
var velocityArray = [];

for(k = 0; k < dotsCount; k++){
    xArray.push(Math.random());
    velocityArray.push(Math.random() * 0.0005 - Math.random() * 0.0005);
}

var bg = new Path.Rectangle({
    from: new Point(0, 0),
    to: new Point(view.size.width, view.size.height),
    fillColor: light,
});

var circle = new Path.Circle({
    radius: view.size.height / 2,
    center: view.center,
    fillColor: yellow,
});

//define dot symbol
var dot = new Path.Circle({
    radius: dotRadius,
    fillColor: dark,
    center: view.center,
});
var dotSymbol = new SymbolDefinition(dot);

//define arc drawing function
function drawArc(from, to, length){
    var arc = new Path();
    arc.strokeColor = dark;
    arc.add(new Point(Math.min(from.x, to.x), from.y - offset * view.size.height));
    arc.add(new Point((from.x + to.x) / 2, from.y - offset * view.size.height - length / 2));
    arc.add(new Point(Math.max(from.x, to.x), to.y - offset * view.size.height));
    arc.segments[0].handleOut.y -= length / 2 * 0.56;
    arc.segments[2].handleIn.y -= length / 2 * 0.56;
    arc.segments[1].handleIn.x -= length / 2 * 0.56;
    arc.segments[1].handleOut.x += length / 2 * 0.56;
    arc.opacity = 1 - length / maxDistance;
}

function onResize(event){

    usersContainerWidth = usersContainer.offsetWidth;
    view.viewSize = new Size(usersContainerWidth, usersContainerWidth);

    bg.bounds.size = new Size(view.size.width, view.size.height);
    bg.position = view.center;
    circle.bounds.size = new Size(view.size.height, view.size.height);
    circle.position = view.center;
    maxDistance = view.size.height / 2;
}

var dotLayer = new Layer();

function onFrame(event){
    if (event.count % 2 === 0){
        dotLayer.removeChildren();
        for(i = 0; i < dotsCount; i++){
            xArray[i] += velocityArray[i];
            if(xArray[i] < 0 || xArray[i] > 1){
                velocityArray[i] *= -1;
            }
            var point1 = new Point(view.size.width / 2 - view.size.height / 2 + xArray[i] * view.size.height, view.size.height / 2);
            dotSymbol.place(point1);
            for(j = i; j < dotsCount; j++){
                var point2 = new Point(view.size.width / 2 - view.size.height / 2 + xArray[j] * view.size.height, view.size.height / 2)
                var distance = Math.abs(point1.x - point2.x);
                if(i != j && distance < maxDistance){
                    drawArc(point1, point2, distance);
                }
            }
        }
    }
}
