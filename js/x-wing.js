var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var TieFighter = require('./tiefighter');
var SideFighter = require('./sidefighter');
var FireLazers = require('./lazers');
// needs to move somewhere
// NEEDS TO BE IN ANOTHER FILE:

// test data
// end test data
var score = 0;
var deathstar = new Image();
deathstar.src = "images/deathstar.png";
var gameOver = false;
var gameOverImg = new Image();
gameOverImg.src = "images/gameover.png";
var X_BOUND = 600;
var Y_BOUND = 380;
var x = canvas.width/2;
var y = canvas.height/2;
var dxLeft = -3;
var dy = 3;
var rightPressed = false;
var leftPressed = false;
var downPressed = false;
var upPressed = false;
var fire = false;
var fireTicker = 0;
var deathSize = 25;
var count = 0;

var dxCrosshairs = 0;
var dyCrosshairs = 0;


var lazers = [];
var sideFighters = [];
var forwardFighters = [];
var crosshair = new CrossHairs(x,y);
var lazer = new FireLazers([x,y]);

//TODO: make Crosshairs class
function CrossHairs(posX, posY)  {
  this.crossX = posX + 11;
  this.crossY = posY - 10;
}

function drawCrosshairs (){
  var crossX = x + 48;
  var crossY = y + 5;
  ctx.drawImage(
    crosshairs,        // the image of the sprite sheet
                  // source coordinates      (x,y,w,h)
     crossX + dxCrosshairs ,crossY + dyCrosshairs,100, 100
   );
}

//TODO: make DeathStar class
function drawDeathstar(){
  ctx.drawImage(
    deathstar,        // the image of the sprite sheet
                  // source coordinates      (x,y,w,h)
     10,10,deathSize, deathSize  // destination coordinates (x,y,w,h)
   );

}

function drawXwing() {
  var xWing;
  if (leftPressed && upPressed && x > 0 && y > 0){
    dyCrosshairs = -50;
    dxCrosshairs = -50;
    xWing = xWing4;
  }
  else if (rightPressed && downPressed && x < X_BOUND && y < Y_BOUND){
    dyCrosshairs = 50;
    dxCrosshairs = 50;
    xWing = xWing6;
  }
  else if (leftPressed && downPressed && x > 0 && y < Y_BOUND){
    dxCrosshairs = -50;
    dyCrosshairs = 50;
    xWing = xWing8;
  }
  else if (rightPressed && upPressed && x < X_BOUND && y > 0){
    dyCrosshairs = -50;
    dxCrosshairs = 50;
    xWing = xWing9;
  }
  else if (leftPressed && x > 0){
    dxCrosshairs = -50;
    xWing = xWing10;
  }
  else if (rightPressed && x < X_BOUND){
    dxCrosshairs = 50;
    xWing = xWing5;
  } else if (downPressed && y < Y_BOUND ) {
    dyCrosshairs = 50;
    xWing = xWing1;
  } else if (upPressed && y > 0) {
    dyCrosshairs = -50;
    xWing = xWing2;
  }
  else {
    xWing = xWing0;
  }

  ctx.drawImage(
    xWing,        // the image of the sprite sheet
                  // source coordinates      (x,y,w,h)
     x,y,200, 120  // destination coordinates (x,y,w,h)
   );

}
// TODO: make KeyHandler class
function keyPressedHandler(e){
  if (e.keyCode === 32){
    lazers.push(
      new FireLazers([x,y],  leftPressed, rightPressed, upPressed, downPressed)
    );
  }
}

function keyDownHandler(e) {
  if(e.keyCode === 39 ) {
    rightPressed = true;
  }
  if(e.keyCode === 37 ) {
    leftPressed = true;
  }
  if (e.keyCode === 40) {
    downPressed = true;
  }
  if (e.keyCode === 38) {
    upPressed = true;
  }
}

function keyUpHandler(e) {
  if(e.keyCode === 39) {
      rightPressed = false;
  }
  if(e.keyCode === 37) {
      leftPressed = false;
  }
  if (e.keyCode === 40) {
    downPressed = false;
  }
  if (e.keyCode === 38) {
    upPressed = false;
  }
}

function step() {
  deathSize  += .01;
  if (deathSize > 200){
    gameOver = true;
  }
  if (gameOver){
    ctx.drawImage(
      gameOverImg,        // the image of the sprite sheet
                    // source coordinates      (x,y,w,h)
       0,0,800, 500  // destination coordinates (x,y,w,h)
     );
  } else{
    draw();
  }
}

function draw() {

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawDeathstar();

  var hit = false;
  lazers.forEach(function(laser){
    laser.draw(ctx);
    laser.moveLazers();
    hit = laser.hit(forwardFighters, ctx);
    laser.hit(sideFighters, ctx);
    if (hit){
      score ++;
    }
    hit = false;
  });
  for (var i = 0; i < forwardFighters.length; i++){
    if (forwardFighters[i].distance < 140) {
      forwardFighters[i].draw(ctx);
      forwardFighters[i].grow();
    }
    if (forwardFighters[i].hit && forwardFighters[i].count > 100){
      forwardFighters.splice(i,1);
    }
  }

  sideFighters.forEach(function(tie){
    tie.draw(ctx);
    tie.grow();
  });
  drawCrosshairs();
  drawXwing();

  handleInput();
  ctx.font = "30px Comic Sans MS";
  ctx.fillStyle = "white";
  ctx.fillText(score, 700, 30);

}

function handleInput() {
  if (rightPressed && upPressed && y > 0 && x < X_BOUND){
    x -= dxLeft;
    y -= dy;
  }
  else if (leftPressed && upPressed && y > 0 && x > 0){
    x += dxLeft;
    y -= dy;
  }
  else if (leftPressed && downPressed && y < Y_BOUND && x > 0){
    x += dxLeft;
    y += dy;
  }
  else if (rightPressed && downPressed && y < Y_BOUND && x < X_BOUND){
    x -= dxLeft;
    y += dy;
  }
  else if (rightPressed && x < X_BOUND){
    x -= dxLeft;
  } else if (leftPressed && x > 0) {
    x += dxLeft;
  } else if (downPressed && y < Y_BOUND) {
    y += dy;
  } else if (upPressed && y > 0) {
    y -= dy;
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
  if (count % 100 === 0 && count % 200 !== 0){
    sideFighters.push(new SideFighter(true));
  } else if (count % 200 === 0) {
    sideFighters.push(new SideFighter(false));
  }
  if (count % 200 === 0) {
    forwardFighters.push(new TieFighter());
  }
  if (sideFighters.length > 10){
    sideFighters.splice(0,5);
  }

  if (lazers.length > 0){
    lazers = [];
  }

  if (forwardFighters.length > 10){
    forwardFighters.splice(0,1);
  }
  count += 1;
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


setInterval(step, 10);
