/// PARAMETERS



var min_screenSize = 300;
var screenSize;
var circleRadius;
var resolution  = get("number_resolution").value || 100;
var coefficient = get("number_coefficient").value || 2;

var lineColor = "white";

var pi = Math.PI, tpi = 2*pi;

/// GLOBALS

var cvs = get("cvs"), ctx = cvs.getContext('2d');

///

function init()
{

  canvas_autosize();
  cvs.width = cvs.height = screenSize;

  //pixel fix?
  //ctx.translate(0.5, 0.5);
  ctx.translate (circleRadius, circleRadius);
  ctx.strokeStyle = lineColor;

  drawoid();
  update();
  refreshList();

}


function point2coord(n)
{
  var x = circleRadius * Math.cos(tpi * n / resolution);
  var y = circleRadius * Math.sin(tpi * n / resolution);
  return {x:x,y:y};
}

function connect(a,b)
{
    var A = point2coord(a), B = point2coord(b);
    ctx.beginPath();
    ctx.moveTo(A.y, A.x);
    ctx.lineTo(B.y, B.x);
    ctx.stroke();
}

function drawoid()
{

  ctx.clearRect(-circleRadius,-circleRadius, 2*circleRadius, 2*circleRadius);

  for(var i = 0; i < resolution; i++)
  {
    connect(i, (i*coefficient)%resolution);
    //connect(i, (i/coefficient)%resolution);
  }

}

init();
