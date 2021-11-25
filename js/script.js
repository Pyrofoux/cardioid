/// PARAMETERS

var circleRadius = 180;
var screenSize  = 2*circleRadius;
var resolution  = 100;
var coefficient = 2;

var lineColor = "white";

var pi = Math.PI, tpi = 2*pi;

/// GLOBALS

var cvs = get("cvs"), ctx = cvs.getContext('2d');

///

function init()
{

  cvs.width = cvs.height = screenSize;

  //pixel fix?
  //ctx.translate(0.5, 0.5);
  ctx.translate (circleRadius, circleRadius);
  ctx.strokeStyle = lineColor;
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
  }

}

function PlusResolution()
{
  resolution++;
  update();
}

function PlusCoefficient()
{
  coefficient++;
  update();
}

function MinusResolution()
{
  resolution = Math.max(resolution-1, 0);
  update();
}

function MinusCoefficient()
{
  coefficient = Math.max(coefficient-1, 0);
  update();
}

function update()
{
  get("number_coefficient").value = coefficient;
  get("number_resolution").value = resolution;
  drawoid();
}


init();
drawoid();
