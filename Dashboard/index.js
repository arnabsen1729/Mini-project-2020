

    let count = 0
    let clicked=0
    let paths=1
    var points = [];

    function handleClick(x)
    {
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

      $(document).on("click","circle",function(e){
        e.stopPropagation();
        var offset = (this).getBoundingClientRect();
        var y = offset.top;
        var x = offset.left;
        if(count===5)
        {
          $("#can").append(`<input class="inputcircle" placeholder="A" style="font-size:25px;position:absolute;left:${x+20-258.79998779296875}px;top:${y+25-66.60000610351562}px;width:20px">`);
        }
        if(count===3&&clicked===0){
              var ids="path"+paths;
              d3.select("#board2").append("path").attr("class","path").attr("id",ids)

        }

        if(count===3){drawSpline(x+40-258.79998779296875,y+40-66.60000610351562,0)}
        if(count===3)
        {
          if(clicked===0){
            clicked++;
          }
          else{
            clicked=0;
            paths++;
            points.length=0;
          }
        }

      })

      document.getElementById('board').addEventListener('click', function (e)
      {
          e=window.event||e;
          if(this===e.target){
          var elem = document.getElementById('board');
          let rect = elem.getBoundingClientRect();
          let x = event.clientX - rect.left;
          let  y = event.clientY - rect.top;
          console.log('X-coord: ', x, '\nY-coord: ',y);

          if(count===2){drawCircle( x, y, 40)}
          else if(count===3&&clicked===1){drawSpline(x,y,1)}
          }
      }, false);


    function drawCircle(x,y,radius)
    {
      d3.select("#board").append("circle").attr("class","circle").attr("cx",x).attr("cy",y).attr("r",40).attr("stroke","black").attr("stroke-width",2).style("fill","white")
    }

    function drawSpline(x,y,k)
    {
      if(k)
      {
        d3.select("#board").append("circle").attr("cx",x).attr("cy",y).attr("r",3).attr("stroke","black").attr("stroke-width",2).style("fill","white")
      }
      var canvas = document.getElementById('board');
      points.push(x);
      points.push(y);

        var tension = 1.2;
        var ids = "path"+paths;
        var path = document.getElementById(ids);
        path.setAttribute("d", solve(points, tension));

        function solve(data, k) {

          if (k == null) k = 1;

          var size = data.length;
          var last = size - 4;

          var path = "M" + [data[0], data[1]];

          for (var i = 0; i < size - 2; i +=2) {

            var x0 = i ? data[i - 2] : data[0];
            var y0 = i ? data[i - 1] : data[1];

            var x1 = data[i + 0];
            var y1 = data[i + 1];

            var x2 = data[i + 2];
            var y2 = data[i + 3];

            var x3 = i !== last ? data[i + 4] : x2;
            var y3 = i !== last ? data[i + 5] : y2;

            var cp1x = x1 + (x2 - x0) / 6 * k;
            var cp1y = y1 + (y2 - y0) / 6 * k;

            var cp2x = x2 - (x3 - x1) / 6 * k;
            var cp2y = y2 - (y3 - y1) / 6 * k;

            path += "C" + [cp1x, cp1y, cp2x, cp2y, x2, y2];
          }

          return path;
        }
    }

    $(document).on("click","path",function(e){
      e.stopPropagation();
      if(count===5){
      var len = (this).getTotalLength();
      var points = (this).getPointAtLength(len/2);
      console.log(points);
      $("#can").append(`<input class="input" placeholder="0/0" style="position:absolute;left:${points.x-10}px;top:${points.y-10}px;width:20px">`);
    }
    });
