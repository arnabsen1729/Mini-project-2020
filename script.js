var elem = document.getElementById('board'),
    elemLeft = elem.offsetLeft + elem.clientLeft,
    elemTop = elem.offsetTop + elem.clientTop,
    context = elem.getContext('2d'),
    elements = [];
console.log(context);
// Add event listener for `click` events.

function drawPoint(surf, centerX, centerY, radius) {
    surf.beginPath();
    surf.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    surf.fillStyle = 'green';
    surf.fill();
    surf.lineWidth = 5;
    surf.strokeStyle = '#003300';
    surf.stroke();
}

elem.addEventListener('click', function (event) {

    var x = event.pageX - elemLeft,
        y = event.pageY - elemTop;
    console.log('X-coord: ', x, '\nY-coord: ', y);
    // Collision detection between clicked offset and element.
    drawPoint(context, x, y, 10)

}, false);

