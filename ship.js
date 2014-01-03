(function(root){
  var Asteroids = root.Asteroids = (root.Asteroids || {})

  Ship = Asteroids.Ship = function(pos, vel){
    Asteroids.MovingObject.call(this, pos, vel, Ship.RADIUS, Ship.COLOR);
  }
  Ship.inherits(Asteroids.MovingObject);
  Ship.RADIUS = 20;
  Ship.COLOR = "CYAN";

  Ship.prototype.power = function(impulse){
    this.vel = [this.vel[0] + impulse[0], this.vel[1] + impulse[1]];
  };

  Ship.prototype.fireBullet = function(game){
    if (this.vel == [0, 0]){
      return
    }
    // var speed = Math.sqrt(Math.pow(this.vel[0], 2) + Math.pow(this.vel[1], 2));
    var speed = 0.1;
    var direction = [this.vel[0]/speed, this.vel[1]/speed];
    return new Asteroids.Bullet(this.pos, direction, game);

  }

})(this);