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
