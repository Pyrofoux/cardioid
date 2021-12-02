/// PARAMETERS



var min_screenSize = 300;
var lineColor = "white";
var pi = Math.PI, tpi = 2*pi;


/// GLOBALS

var cvs = get("cvs"), ctx = cvs.getContext('2d');
var export_lines = [];
var screenSize;
var circleRadius;
var resolution  = get("number_resolution").value || 100;
var coefficient = get("number_coefficient").value || 2;

///

function init()
{

  canvas_autosize();
  cvs.width = cvs.height = screenSize;

  //pixel fix?
  //ctx.translate(0.5, 0.5);
  ctx.translate (screenSize/2, screenSize/2);
  ctx.strokeStyle = lineColor;

  drawoid(cvs,ctx);
  update();
  refreshList();

}


function point2coord(n)
{
  var circleRadius = screenSize/2;
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

function drawoid(_cvs,_ctx, _screenSize)
{


  _cvs = _cvs || cvs;
  _ctx = _ctx || ctx;
  _screenSize = _screenSize || screenSize;

  ctx.fillStyle = "black";
  ctx.fillRect(-screenSize/2,-screenSize/2, screenSize, screenSize);

  export_lines = [["Start","End"]];

  for(var i = 0; i < resolution; i++)
  {
    var a = i;
    var b = (i*coefficient)%resolution;
    connect(a, b);

    export_lines.push([a,b]);
  }

}

init();
