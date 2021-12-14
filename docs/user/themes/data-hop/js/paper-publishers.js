var publishersContainer = document.getElementById('publishers-animation-container');
var publishersContainerWidth = publishersContainer.offsetWidth;

view.viewSize = new Size(publishersContainerWidth, publishersContainerWidth);

window.addEventListener('resize', onResize, false);

//colors
var blue = '#99e2eb';
var dark = '#2e343a';
var light = '#f8f8f8';

var dotsCount = 12;
var dotRadius = 1.5;
var offset = 0.04;
var maxDistance = view.size.height / 2;
var xArray = [];
var velocityArray = [];
var point2 = view.center;

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
    fillColor: blue,
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

var publisher = dotSymbol.place(view.center);

var dotLayer = new Layer();

function onResize(event){

    publishersContainerWidth = publishersContainer.offsetWidth;
    view.viewSize = new Size(publishersContainerWidth, publishersContainerWidth);

    bg.bounds.size = new Size(view.size.width, view.size.height);
    bg.position = view.center;
    circle.bounds.size = new Size(view.size.height, view.size.height);
    circle.position = view.center;
    maxDistance = view.size.height / 2;
    point2 = view.center;
    publisher.position = view.center;
}

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
            var distance = Math.abs(point1.x - point2.x);
            if(distance < maxDistance){
                drawArc(point1, point2, distance);
            }
        }
    }
}
