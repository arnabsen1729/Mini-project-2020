var elem = document.getElementById('board'),
    elemLeft = elem.offsetLeft + elem.clientLeft,
    elemTop = elem.offsetTop + elem.clientTop,
    context = elem.getContext('2d'),
    elements = [];
var arr = [];
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
        arr.push({x:x,y:y});
          var c = document.getElementById("board");
          var ctx = c.getContext("2d");
          ctx.beginPath();
          ctx.moveTo(arr[0].x, arr[0].y);
          for (var a = 0; a < arr.length-1; a++)
          {
              var xc = (arr[a].x + arr[a+1].x) / 2;
              var yc = (arr[a].y + arr[a+1].y) / 2;
              ctx.quadraticCurveTo(arr[a].x, arr[a].y, xc, yc);

          }
          ctx.stroke();
    console.log('X-coord: ', x, '\nY-coord: ', y);
    // Collision detection between clicked offset and element.
    drawPoint(context, x, y, 10)

}, false);
