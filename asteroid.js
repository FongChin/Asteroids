(function(root){
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Asteroid = Asteroids.Asteroid = function(pos, vel, radius, color){
    Asteroids.MovingObject.call(this, pos, vel, radius, color);
  }
  Asteroid.inherits(Asteroids.MovingObject);
  Asteroid.COLOR = "red";
  Asteroid.RADIUS = 20;

  Asteroid.randomAsteroid = function(dimX, dimY){
    return new Asteroid(
      [dimX * Math.random(), dimY * Math.random()],
      _randomVec(),
      Asteroid.RADIUS,
      Asteroid.COLOR);
  }

  var _randomVec = function(){
    return [(Math.random() * 2) - 1, (Math.random() * 2) - 1];
  }
})(this);