function TieFighter(position){
  this.tieFighterImg = new Image();
  this.tieFighterImg.src = "images/tie/0.png";
  this.position = position;
  this.distance = 5;

}

TieFighter.prototype.draw = function(ctx){
  ctx.drawImage(
    this.tieFighterImg,
    200,200, this.distance, this.distance
  );

};
TieFighter.prototype.grow = function(){
  this.distance += 0.25;
};

TieFighter.prototype.location = function(){
  return this.position;
};

module.exports = TieFighter;
