var elem = document.getElementById('board'),
    elemLeft = elem.offsetLeft + elem.clientLeft,
    elemTop = elem.offsetTop + elem.clientTop,
    context = elem.getContext('2d'),
    elements = [];
var arr = [];
var a=0;
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
        arr.push(x);
        arr.push(y);
        if(arr.length>2){
          var c = document.getElementById("board");
          var ctx = c.getContext("2d");
          ctx.beginPath();
          ctx.moveTo(arr[0], arr[1]);
          for (a = 0; a < arr.length - 2; a+=2)
          {
              var xc = (arr[a] + arr[a+2]) / 2;
              var yc = (arr[a+1] + arr[a+3]) / 2;
              ctx.quadraticCurveTo(arr[a], arr[a+1], xc, yc);
          }
          // curve through the last two points
          ctx.quadraticCurveTo(arr[a], arr[a+1], arr[a+2],arr[a+3]);
          ctx.stroke();
          a=a+2;
          }
    console.log('X-coord: ', x, '\nY-coord: ', y);
    // Collision detection between clicked offset and element.
    drawPoint(context, x, y, 10)

}, false);
