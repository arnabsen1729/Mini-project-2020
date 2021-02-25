

    let count = 0

    function handleClick(x){
      count=x
      var elem = document.getElementById(x);
      elem.className += " is-pressed"
      for(var i=1;i<6;i++)
      {
        if(i!=x)
        {
          var elem2= document.getElementById(i)
          elem2.classList.remove("is-pressed")
        }
      }
    }

    window.onload = function(){

      let button= document.getElementById('can')
      button.addEventListener('click', function (event) {

          var elem = document.getElementById('board');
          let rect = elem.getBoundingClientRect();
          let x = event.clientX - rect.left;
          let  y = event.clientY - rect.top;
          console.log('X-coord: ', x, '\nY-coord: ', y,count,rect.left,rect.top);

          if(count===2){drawCircle( x, y, 40)}
          else if(count===3){drawSpline(x,y)}

      }, false);
    }


    function drawCircle(x,y,radius) {
      // var canvas = document.getElementById('board');
      // if (canvas.getContext) {
      //   var ctx = canvas.getContext('2d');
      //       ctx.beginPath();
      //       ctx.arc(x, y, radius,0, Math.PI*2);
      //         ctx.stroke();
      //   }
      var i=+x+"-"+y;
      jQuery('<div.>',{id:i,"class":'circle'}).appendTo("div#can")
      var d= document.getElementById(i)
      d.style.position="absolute";
      d.style.left=x-40+258.79998779296875+'px';
      d.style.top=y-40+66.60000610351562+'px';
    }

    var arr = [];
    function drawSpline(x,y) {
      var canvas = document.getElementById('board');
      arr.push({x:x,y:y});
      if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
              ctx.beginPath();
              ctx.arc(x, y, 3,0, Math.PI*2);
              ctx.fillStyle = 'green';
              ctx.fill();
          ctx.moveTo(arr[0].x, arr[0].y);
          for (var a = 0; a < arr.length-1; a++)
          {
              var xc = (arr[a].x + arr[a+1].x) / 2;
              var yc = (arr[a].y + arr[a+1].y) / 2;
              ctx.quadraticCurveTo(arr[a].x, arr[a].y, xc, yc);

          }
          ctx.stroke();
        }
    }
