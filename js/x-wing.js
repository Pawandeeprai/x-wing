var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
// var TieFighter = require('./tiefigther');
// needs to move somewhere

var deathstar = new Image();
deathstar.src = "images/deathstar.png";
var X_BOUND = 700;
var Y_BOUND = 440;
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

function FireLazers(pos){
  if (leftPressed){
    this.left = true;
  }
  if (rightPressed){
    this.right = true;
  }
  if (upPressed){
    this.up = true;
  }
  if (downPressed){
    this.down = true;
  }
  this.m = 25;
  this.b = 0;
  this.posX2 = pos[0] + 100;
  this.posX1 = pos[0] ;
  this.posY = pos[1];
  this.radius = 5;
}

FireLazers.prototype.draw = function(){
  ctx.beginPath();
  ctx.arc(this.posX1 , this.posY, this.radius, 0, Math.PI*2, false);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  ctx.arc(this.posX2, this.posY, this.radius, 0, Math.PI*2, false);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();
};

FireLazers.prototype.moveLazers = function(){
  if (this.left){
    this.posX1 = this.posX1 -  1.5 * this.m;
    this.posX2 = this.posX2 - 3.5 * this.m;
  }
  else if (this.right) {
    this.posX1 = this.posX1 + 3.5 * this.m;
    this.posX2 = this.posX2 + 1.5 * this.m;
  }
  else {
    this.posX1 = this.posX1 + this.m;
    this.posX2 = this.posX2 - this.m;
  }
  this.m = this.m * 0.35;
  this.radius = this.radius * 0.95;
  if (this.up){
    this.posY = this.posY - this.m;
  }
  else if (this.down) {
    this.posY = this.posY + this.m * 5;
  }
  else{
    this.posY = this.posY + this.m * 0.5;
  }

};
var lazers = [];
var crosshair = new CrossHairs(x,y);
var lazer = new FireLazers([x,y]);

//TODO: make Crosshairs class
function CrossHairs(posX, posY)  {
  this.crossX = posX + 11;
  this.crossY = posY - 10;
}
function drawCrosshairs (){
  var crossX = x + 11;
  var crossY = y - 10;
  ctx.drawImage(
    crosshairs,        // the image of the sprite sheet
                  // source coordinates      (x,y,w,h)
     crossX + dxCrosshairs ,crossY + dyCrosshairs,80, 80
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
    dyCrosshairs = -30;
    dxCrosshairs = -30;
    xWing = xWing4;
  }
  else if (rightPressed && downPressed && x < X_BOUND && y < Y_BOUND){
    dyCrosshairs = 30;
    dxCrosshairs = 30;
    xWing = xWing6;
  }
  else if (leftPressed && downPressed && x > 0 && y < Y_BOUND){
    dxCrosshairs = -30;
    dyCrosshairs = 30;
    xWing = xWing8;
  }
  else if (rightPressed && upPressed && x < X_BOUND && y > 0){
    dyCrosshairs = -40;
    dxCrosshairs = 40;
    xWing = xWing9;
  }
  else if (leftPressed && x > 0){
    dxCrosshairs = -30;
    xWing = xWing10;
  }
  else if (rightPressed && x < X_BOUND){
    dxCrosshairs = 30;
    xWing = xWing5;
  } else if (downPressed && y < Y_BOUND ) {
    dyCrosshairs = 30;
    xWing = xWing1;
  } else if (upPressed && y > 0) {
    dyCrosshairs = -30;
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
// TODO: make KeyHandler class
function keyPressedHandler(e){
  if (e.keyCode === 32){
    lazers.push(new FireLazers([x,y], [crosshair.crossX, crosshair.crossY]));
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
  deathSize  += 0.01;
  draw();
}

function draw() {

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // ctx.drawImage(background);
  drawDeathstar();
  drawCrosshairs();
  lazers.forEach(function(laser){
    laser.draw();
    laser.moveLazers();
  });
  drawXwing();
  handleInput();


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
