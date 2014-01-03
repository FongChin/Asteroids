(function(root){
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Bullet = Asteroids.Bullet = function(pos, direction, game){
    Asteroids.MovingObject.call(this, pos, direction, 5, "white");
    this.game = game;
  }
  Bullet.inherits(Asteroids.MovingObject);

  Bullet.prototype.hitAsteroids = function(){
    var bullet = this;
    this.game.asteroids.forEach(function(asteroid){
      if (bullet.isCollidedWith(asteroid)){
        bullet.game.removeAsteroid(asteroid);
        bullet.game.removeBullet(bullet);
      }
    });
  }

  Bullet.prototype.move = function(){
    Asteroids.MovingObject.prototype.move.call(this);
    this.hitAsteroids();
  }
})(this);