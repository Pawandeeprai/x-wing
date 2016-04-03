var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var x = canvas.width/2;
var y = canvas.height/2;
var dxRight = 2;
var dxLeft = -2;
var dyUp = -2;
var dyDown = 2;
var rightPressed = false;
var leftPressed = false;

function drawXwing() {
  var xWing;
  if (rightPressed){
    xWing = xWing5;
  } else {
    xWing = xWing0;
  }

  ctx.drawImage(
    xWing,        // the image of the sprite sheet
                  // source coordinates      (x,y,w,h)
     x,y,100, 60  // destination coordinates (x,y,w,h)
   );
}

function keyDownHandler(e) {
  if(e.keyCode === 39 ) {
      rightPressed = true;
      console.log("right");
  }
  else if(e.keyCode === 37 ) {
      leftPressed = true;
  }
}

function keyUpHandler(e) {
    if(e.keyCode === 39) {
        rightPressed = false;
    }
    else if(e.keyCode === 37) {
        leftPressed = false;
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawXwing();
    if (rightPressed && x < 700){
      x -= dxLeft;
    } else if (leftPressed && x > 0) {
      x += dxLeft;
    }
}

var xWing0 = new Image();
xWing0.src = "images/x-wing/0.png";
var xWing1 = new Image();
xWing1.src = "images/x-wing/1.png";
var xWing5 = new Image();
xWing5.src = "images/x-wing/5.png";
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);


setInterval(draw, 10);
