function TieFighter(position){
  this.tieFighterImg = new Image();
  this.tieFighterImg.src = "images/tie/0.png";
  this.position = position;
  this.distance = 1;

}

TieFighter.prototype.draw = function(ctx){
  ctx.drawImage(
    this.tieFighterImg,
    200,200, 100, 100
  );

};
TieFighter.prototype.grow = function(){

};



module.exports = TieFighter;
