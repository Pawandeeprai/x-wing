/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	var TieFighter = __webpack_require__(1);
	var SideFighter = __webpack_require__(2);
	var FireLazers = __webpack_require__(3);
	// needs to move somewhere
	// NEEDS TO BE IN ANOTHER FILE:

	// test data
	// end test data
	var deathstar = new Image();
	deathstar.src = "images/deathstar.png";
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
	  deathSize  += 0.01;
	  draw();
	}

	function draw() {

	  ctx.clearRect(0, 0, canvas.width, canvas.height);
	  drawDeathstar();

	  lazers.forEach(function(laser){
	    laser.draw(ctx);
	    laser.moveLazers();
	    laser.hit(forwardFighters.concat(sideFighters));
	  });
	  forwardFighters.forEach(function(tiefighter){
	    if (tiefighter.distance < 140) {
	      tiefighter.draw(ctx);
	    }
	    tiefighter.grow();
	  });
	  sideFighters.forEach(function(tie){
	    tie.draw(ctx);
	    tie.grow();
	  });
	  drawCrosshairs();
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
	  if (count % 100 === 0 && count % 200 !== 0){
	    sideFighters.push(new SideFighter(true));
	  } else if (count % 200 === 0) {
	    sideFighters.push(new SideFighter(false));
	  }
	  if (count % 200 === 0) {
	    forwardFighters.push(new TieFighter("change me"));
	  }
	  if (sideFighters.length > 10){
	    sideFighters.splice(0,5);
	  }

	  if (lazers.length > 5){
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


/***/ },
/* 1 */
/***/ function(module, exports) {

	function TieFighter(position){
	  var tiePos = [[400, 400], [600, 400], [200,400], [400, 50], [600, 50], [200,50]];
	  this.tieFighterImg = new Image();
	  this.tieFighterImg.src = "images/tie/0.png";
	  this.position = tiePos[Math.floor(Math.random() * 6)];
	  this.distance = 5;
	  this.m = 0.25;
	  this.hit = false;
	}

	TieFighter.prototype.draw = function(ctx){
	  if (this.hit !== true){
	    ctx.drawImage(
	      this.tieFighterImg,
	      this.position[0],this.position[1], this.distance, this.distance
	    );
	  }

	};
	TieFighter.prototype.grow = function(){
	  this.distance += this.m;
	  this.m *= 1.001;
	};

	TieFighter.prototype.location = function(){
	  return this.position;
	};

	module.exports = TieFighter;


/***/ },
/* 2 */
/***/ function(module, exports) {

	function SideFighter(left){
	  this.hit = false;
	  this.tieFighterImg = new Image();
	  this.tieFighterImg.src = "images/tie/side.png";
	  this.left = left;
	  this.distance = 40;
	  this.posY = Math.random() * 200;
	  if (this.left){
	    this.posX = -10;
	  } else {
	    this.posX = 710;
	  }
	  this.position = [this.posX, this.posY];
	}

	SideFighter.prototype.draw = function(ctx){
	  if (this.left && this.hit !== true){
	    ctx.drawImage(
	      this.tieFighterImg,
	      140,0, 50, 100,
	      this.posX,this.posY, this.distance - 10, this.distance + 10
	    );
	  } else if (this.hit !== true) {
	    ctx.drawImage(
	      this.tieFighterImg,
	      140,0, 50, 100,
	      this.posX,this.posY, this.distance - 10, this.distance + 10
	    );
	  }


	};
	SideFighter.prototype.grow = function(){
	  this.distance += 0.005;
	  if (this.left){
	    this.posX += 5;
	  } else {
	    this.posX -=5;
	  }
	  this.posY += 1;
	};

	SideFighter.prototype.location = function(){
	  return [this.posX, this.posY];
	};

	module.exports = SideFighter;


/***/ },
/* 3 */
/***/ function(module, exports) {

	function FireLazers(pos, leftPressed, rightPressed, upPressed, downPressed){
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
	  this.m = 55;
	  this.b = 0;
	  this.posX2 = pos[0] + 200;
	  this.posX1 = pos[0] ;
	  this.posY = pos[1];
	  this.radius = 5;
	}
	FireLazers.prototype.location = function(){
	  return [this.posX1, this.posY1];
	};

	FireLazers.prototype.draw = function(ctx){
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
	    this.posX1 = this.posX1 -  0.25 * this.m;
	    this.posX2 = this.posX2 - 2.5 * this.m;
	  }
	  else if (this.right) {
	    this.posX1 = this.posX1 + 2.5 * this.m;
	    this.posX2 = this.posX2 + 0.25 * this.m;
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
	    this.posY = this.posY + this.m * 1.2;
	  }

	};

	FireLazers.prototype.hit = function(allFighters){
	  var posX = this.posX1 + 100;
	  var posY = this.posY + 30;

	  allFighters.forEach(function(fighter){
	    if (posX >= fighter.position[0] && posX <= fighter.position[0] + 100
	        ){
	      if (posY > fighter.position[1] && posY < fighter.position[1] + 100)
	      fighter.hit = true;
	    }
	  });

	};

	module.exports = FireLazers;


/***/ }
/******/ ]);