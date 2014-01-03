(function(root){
  var Asteroids = root.Asteroids = (root.Asteroids || {})

  var MovingObject = Asteroids.MovingObject = function(pos, vel, radius, color){
    this.pos = pos;
    this.vel = vel;
    this.radius = radius;
    this.color = color;
  }

  MovingObject.prototype.move = function(){
    // Update position
    this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]]
  }

  MovingObject.prototype.draw = function(ctx){
    ctx.fillStyle = this.color;
    ctx.beginPath();

    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();
  };

  MovingObject.prototype.isCollidedWith = function(otherObject){
    var x1 = this.pos[0],
        y1 = this.pos[1],
        x2 = otherObject.pos[0],
        y2 = otherObject.pos[1]
    var distance = Math.sqrt(Math.pow((x2 - x1),2) + Math.pow((y2 - y1),2))
    return ((this.radius + otherObject.radius) > distance)
  }
})(this);

Function.prototype.inherits = function (superClass){
  function Surrogate(){ }
  Surrogate.prototype = superClass.prototype;
  this.prototype = new Surrogate()
}


