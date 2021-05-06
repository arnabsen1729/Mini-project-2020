

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
      if(x===4){
        var c = document.getElementById('can').childNodes;
        var len = document.getElementById('can').childNodes.length;
        for(var i=len-1;i>2;i--)
        document.getElementById('can').removeChild(c[i]);

        var s = document.getElementById('board').childNodes;
        var slen = document.getElementById('board').childNodes.length;
        for(var i=slen-1;i>2;i--)
        document.getElementById('board').removeChild(s[i]);

        var ss = document.getElementById('board2').childNodes;
        var sslen = document.getElementById('board2').childNodes.length;
        for(var i=sslen-1;i>=0;i--)
        document.getElementById('board2').removeChild(ss[i]);
      }
    }
      var start;
      var end;
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
              start = (this);

        }

        if(count===3&&clicked===1){
          end=(this);
          var line = new LeaderLine(start,end);
          line.position();

          lines.push(line);
        }
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

      var lines= [];
      function fixLine() {
        for(var i=0;i<lines.length;i++)
        lines[i].position();

  }
    function drawCircle(x,y,radius)
    {
      d3.select("#board").append("circle").attr("class","state").attr("cx",x).attr("cy",y).attr("r",40).attr("stroke","black").attr("stroke-width",2).style("fill","white")
    }

    var circleCount=0;
    function drawSpline(x,y,k)
    {
        d3.select("#board").append("circle").attr("class","circle").attr("cx",x).attr("cy",y).attr("r",3).attr("stroke","black").attr("stroke-width",2).style("fill","white")
        new PlainDraggable(document.getElementsByClassName('circle')[circleCount],{onMove:fixLine});
        end = document.getElementsByClassName('circle')[circleCount];
        var line = new LeaderLine(start,end);
        line.position();
        start = document.getElementsByClassName('circle')[circleCount];
        circleCount++;
        lines.push(line);
    }

    $(document).on("click","path",function(e){
      e.stopPropagation();
      if(count===5){
      var len = (this).getTotalLength();
      var points = (this).getPointAtLength(len/2);
      console.log(points);
      $("#can").append(`<input class="input" placeholder="00/00" style="position:absolute;left:${points.x-30}px;top:${points.y-10}px;width:35px">`);
    }
    });
