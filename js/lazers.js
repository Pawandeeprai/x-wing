var score = 0;


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
  this.hits = false;
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

FireLazers.prototype.hit = function(allFighters, ctx){
  var posX = this.posX1 + 100;
  var posY = this.posY + 30;
  allFighters.forEach(function(fighter){
    if (posX >= fighter.position[0] - 20 && posX <= fighter.position[0] + 100){
      if (posY >= fighter.position[1] - 20 && posY <= fighter.position[1] + 150)
      fighter.hit = true;
      if (fighter.hit === false){
        score ++;
        console.log(score);
      }
    }
  });

};

module.exports = FireLazers;
