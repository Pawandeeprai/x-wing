var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
// needs to move somewhere

var deathstar = new Image();
deathstar.src = "images/deathstar.png";

var x = canvas.width/2;
var y = canvas.height/2;
var dxRight = 2;
var dxLeft = -2;
var dy = 2;
var rightPressed = false;
var leftPressed = false;
var downPressed = false;
var upPressed = false;
var fire = false;
var fireTicker = 0;
var deathSize = 25;
var dxCrosshairs = 0;
var dyCrosshairs = 0;


function drawCrosshairs (){
  var crossX = x + 11;
  var crossY = y - 5;
  ctx.drawImage(
    crosshairs,        // the image of the sprite sheet
                  // source coordinates      (x,y,w,h)
     crossX + dxCrosshairs ,crossY + dyCrosshairs,80, 80
   );
}


function drawDeathstar(){
  ctx.drawImage(
    deathstar,        // the image of the sprite sheet
                  // source coordinates      (x,y,w,h)
     10,10,deathSize, deathSize  // destination coordinates (x,y,w,h)
   );
   deathSize  += 0.01;
}

function drawXwing() {
  var xWing;
  if (fire){
    xWing = xWing7;
  }
  else if (leftPressed && upPressed && x > 0 && y > 0){
    dyCrosshairs = -40;
    dxCrosshairs = -20;
    xWing = xWing4;
  }
  else if (rightPressed && downPressed && x < 700 && y < 440){
    dyCrosshairs = 30;
    xWing = xWing6;
  }
  else if (leftPressed && downPressed && x > 0 && y < 440){
    dxCrosshairs = -20;
    dyCrosshairs = 30;
    xWing = xWing8;
  }
  else if (rightPressed && upPressed && x < 700 && y > 0){
    dyCrosshairs = -40;
    dxCrosshairs = 20;
    xWing = xWing9;
  }
  else if (leftPressed && x > 0){
    dxCrosshairs = -20;
    xWing = xWing10;
  }
  else if (rightPressed && x < 700){
    dxCrosshairs = 20;
    xWing = xWing5;
  } else if (downPressed && y < 440 ) {
    dyCrosshairs = 30;
    xWing = xWing1;
  } else if (upPressed && y > 0) {
    dyCrosshairs = -40;
    xWing = xWing2;
  }
  else {
    xWing = xWing0;
  }

  ctx.drawImage(
    xWing,        // the image of the sprite sheet
                  // source coordinates      (x,y,w,h)
     x,y,100, 60  // destination coordinates (x,y,w,h)
   );

}

function keyPressedHandler(e){
  if (e.keyCode === 32){
    fire = true;
    fireTicker = 0;
  }
}

function keyDownHandler(e) {
  // upright
  if(e.keyCode === 39 && e.keyCode === 38 ) {
    rightPressed = true;
    upPressed = true;
  }
  // upleft
  else if(e.keyCode === 37 && e.keyCode === 38) {
      leftPressed = true;
      upPressed = true;
  }
  // downleft
  else if(e.keyCode === 37 && e.keyCode === 40) {
      leftPressed = true;
      downPressed = true;
  }
  // downright
  else if(e.keyCode === 39 && e.keyCode === 40) {
      rightPressed = true;
      downPressed = true;
  }
  else if(e.keyCode === 39 ) {
    rightPressed = true;
  }
  else if(e.keyCode === 37 ) {
    leftPressed = true;
  }
  else if (e.keyCode === 40) {
    downPressed = true;
  }
  else if (e.keyCode === 38) {
    upPressed = true;
  }
}

function keyUpHandler(e) {
  if(e.keyCode === 39 && e.keyCode === 38 ) {
    rightPressed = false;
    upPressed = false;
  }
  else if(e.keyCode === 37 && e.keyCode === 38) {
      leftPressed = false;
      upPressed = false;
  }
  else if(e.keyCode === 37 && e.keyCode === 40) {
      leftPressed = false;
      downPressed = false;
  }
  else if(e.keyCode === 39 && e.keyCode === 40) {
      rightPressed = false;
      downPressed = false;
  }
  else if(e.keyCode === 39) {
      rightPressed = false;
  }
  else if(e.keyCode === 37) {
      leftPressed = false;
  }
  else if (e.keyCode === 40) {
    downPressed = false;
  }
  else if (e.keyCode === 38) {
    upPressed = false;
  }
}

function draw() {

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // ctx.drawImage(background);
  drawDeathstar();
  drawCrosshairs();
  drawXwing();
  if (rightPressed && upPressed && y > 0 && x < 700){
    x -= dxLeft;
    y -= dy;
  }
  else if (leftPressed && upPressed && y > 0 && x > 0){
    x += dxLeft;
    y -= dy;
  }
  else if (leftPressed && downPressed && y < 440 && x > 0){
    x += dxLeft;
    y += dy;
  }
  else if (rightPressed && downPressed && y < 440 && x < 700){
    x -= dxLeft;
    y += dy;
  }
  else if (rightPressed && x < 700){
    x -= dxLeft;
  } else if (leftPressed && x > 0) {
    x += dxLeft;
  } else if (downPressed && y < 440) {
    y += dy;
  } else if (upPressed && y > 0) {
    y -= dy;
  }
  fireTicker += 1;
  if (fireTicker > 3) {
    fire = false;
  }
  if (dyCrosshairs > 0){
    dyCrosshairs -= 2;
  } else if (dyCrosshairs < 0) {
    dyCrosshairs += 2;
  }
  if (dxCrosshairs > 0){
    dxCrosshairs -= 2;
  } else if (dxCrosshairs < 0) {
    dxCrosshairs += 2;
  }

}

var crosshairs = new Image();
crosshairs.src = "images/crosshairs.png";

var xWing0 = new Image();
xWing0.src = "images/x-wing/0.png";
var xWing1 = new Image();
xWing1.src = "images/x-wing/1.png";
var xWing2 = new Image();
xWing2.src = "images/x-wing/2.png";
var xWing4 = new Image();
xWing4.src = "images/x-wing/4.png";
var xWing5 = new Image();
xWing5.src = "images/x-wing/5.png";
var xWing6 = new Image();
xWing6.src = "images/x-wing/6.png";
var xWing7 = new Image();
xWing7.src = "images/x-wing/7.png";
var xWing8 = new Image();
xWing8.src = "images/x-wing/8.png";
var xWing9 = new Image();
xWing9.src = "images/x-wing/9.png";
var xWing10 = new Image();
xWing10.src = "images/x-wing/10.png";


document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("keypress", keyPressedHandler, false);


setInterval(draw, 10);
