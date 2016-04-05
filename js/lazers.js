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

module.exports = FireLazers;
