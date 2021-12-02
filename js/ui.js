function canvas_autosize()
{

  var max_window = Math.min(window.innerWidth,window.innerHeight);
  var scaled = Math.round(max_window*0.55);

  scaled += 1-scaled%2;

  if(scaled > min_screenSize)
  {
    screenSize = scaled;
  }
  else
  {
    screenSize = min_screenSize;
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


function load_pattern(save_data)
{
  coefficient = save_data.coefficient;
  resolution = save_data.resolution;
  update();
}
