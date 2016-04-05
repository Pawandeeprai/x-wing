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
  if (this.left){
    ctx.drawImage(
      this.tieFighterImg,
      140,0, 50, 100,
      this.posX,this.posY, this.distance - 10, this.distance + 10
    );
  } else {
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
