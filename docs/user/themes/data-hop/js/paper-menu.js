var cs, paddingY;
var introContainer = document.getElementById('menu-animation-container');
var containerWidth = introContainer.offsetWidth;
var containerHeight = introContainer.offsetHeight;

view.viewSize = new Size(containerWidth, containerHeight);

window.addEventListener('resize', onResize, false);


//colors
var yellow = '#f2e05f';
var dark = '#2e343a';
var light = '#f8f8f8';

var circleBgColor = light;
var sectionBgColor = dark;
var dotsColor = dark;

//variables
var rowsCount, rowHeight, dotsCount, maxDistance
var xArray = [];
var velocityArray = [];

//constants
var dotRadius = 2;
var dotsPerRow = 10;
var maxRowsCount = 5;
var offset = 0.02;

//populate with random values
for(k = 0; k < dotsPerRow * maxRowsCount; k++){
    xArray.push(Math.random());
    velocityArray.push(Math.random() * 0.0005 - Math.random() * 0.0005);
}

//define sizes
function resize(){
    rowsCount = Math.ceil(view.size.height / 250);
    if (rowsCount > maxRowsCount){
        rowsCount = maxRowsCount;
    }
    rowHeight = view.size.height / (rowsCount + 1);
    maxDistance = 2 * (rowHeight - 3 * offset * view.size.height)
    dotsCount = rowsCount * dotsPerRow;
}
resize();

//define dot symbol
var dot = new Path.Circle({
    radius: dotRadius,
    fillColor: dotsColor,
    center: view.center,
});
var dotSymbol = new SymbolDefinition(dot);

//define arc drawing function
function drawArc(from, to, length){
    var arc = new Path();
    arc.strokeColor = dotsColor;
    arc.add(new Point(Math.min(from.x, to.x), from.y - offset * view.size.height));
    arc.add(new Point((from.x + to.x) / 2, from.y - offset * view.size.height - length / 2));
    arc.add(new Point(Math.max(from.x, to.x), to.y - offset * view.size.height));
    arc.segments[0].handleOut.y -= length / 2 * 0.56;
    arc.segments[2].handleIn.y -= length / 2 * 0.56;
    arc.segments[1].handleIn.x -= length / 2 * 0.56;
    arc.segments[1].handleOut.x += length / 2 * 0.56;
    arc.opacity = 1 - length / maxDistance;
}

//background, layers and masking
var bg = new Path.Rectangle({
    from: new Point(0, 0),
    to: new Point(view.size.width, view.size.height),
    fillColor: circleBgColor,
});
var dotLayer = new Layer();
var maskLayer = new Layer();
var mask = new CompoundPath({
    children: [
        bg.clone(),
        new Path.Circle({
            radius: view.size.height / 2,
            center: view.center,
            fillColor: circleBgColor,
        })
    ],
    fillColor: sectionBgColor,
});
mask.reorient();
dotLayer.activate();

function onResize(event){
    cs = getComputedStyle(introContainer);
    containerWidth = introContainer.offsetWidth;
    containerHeight = introContainer.offsetHeight;
    if (window.innerWidth < 1199) {
        return;
    } else {
        paddingY = parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom);
        containerHeight = containerHeight - paddingY;
        if (containerWidth > containerHeight) {
            view.viewSize = new Size(containerHeight, containerHeight);
        } else {
            view.viewSize = new Size(containerWidth, containerWidth);
        }
    }
    resize();
    bg.bounds.size = new Size(view.size.width, view.size.height);
    bg.position = view.center;
    mask.children[0].bounds.size = new Size(view.size.width, view.size.height);
    mask.children[0].position = view.center;
    mask.children[1].bounds.size = new Size(view.size.height, view.size.height);
    mask.children[1].position = view.center;
}

function onFrame(event){
    if (event.count % 2 === 0){
        dotLayer.removeChildren();
        for(i = 0; i < rowsCount; i++){
            for(j = 0; j < dotsPerRow; j++){
                var point1 = new Point(xArray[i * dotsPerRow + j] * view.size.width, rowHeight * 1.3 + i * rowHeight);
                dotSymbol.place(point1);
                for(m = j; m < dotsPerRow; m++){
                    var point2 = new Point(xArray[i * dotsPerRow + m] * view.size.width, rowHeight * 1.3 + i * rowHeight);
                    var distance = Math.abs(point1.x - point2.x);
                    if(m != j && distance < maxDistance){
                        drawArc(point1, point2, distance);
                    }
                }
            }
        }
        for(l = 0; l < dotsCount; l++){
            xArray[l] += velocityArray[l];
            if(xArray[l] < 0 || xArray[l] > 1){
                velocityArray[l] *= -1;
            }
        }
    }
}
