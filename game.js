(function(root){
  var Asteroids = root.Asteroids = (root.Asteroids || {})

  var Game = Asteroids.Game = function(ctx, numAsteroids){
    this.ctx = ctx;
    this.asteroids = [];
    this.addAsteroids(numAsteroids);
    this.ship = new Asteroids.Ship([Game.DIM_X/2, Game.DIM_Y/2], [0, 0]);
    this.bullets = [];
  };

  Game.DIM_X = 750;
  Game.DIM_Y = 600;
  Game.FPS = 30;

  Game.prototype.addAsteroids = function(numAsteroids){
    for(var i = 0; i < numAsteroids; i++){
      this.asteroids.push(Asteroids.Asteroid.randomAsteroid(Game.DIM_X, Game.DIM_Y));
    }
  };

  Game.prototype.draw = function(){
    this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    this.asteroids.forEach(function(asteroid){
      asteroid.draw(this.ctx);
    });
    this.bullets.forEach(function(bullet){
      bullet.draw(this.ctx);
    });
    this.ship.draw(this.ctx);
  };

  Game.prototype.move = function(){
    var game = this;
    var driftedAsteroids = [];

    for(var i = 0; i < this.asteroids.length; i++){
      this.asteroids[i].move();
      if (isAsteroidDrifted(this.asteroids[i])){
        driftedAsteroids.push(i);
      }
    }

    driftedAsteroids.forEach(function(index){
      game.asteroids.splice(index, 1)
    });
    console.log(game.asteroids.length);

    this.bullets.forEach(function(bullet){
      bullet.move();
    });

    this.ship.move();
    this.checkCollisions();
  };

  function isAsteroidDrifted(asteroid){
    var x = asteroid.pos[0] + asteroid.radius,
        y = asteroid.pos[1] + asteroid.radius;

    return ((x > Game.DIM_X || x < 0) || (y > Game.DIM_Y || y < 0))
  }

  Game.prototype.bindKeyHandlers = function(){
    var game = this;
    key('up', function(){
      game.ship.power([0, -0.5]);
    });
    key('down', function(){
      game.ship.power([0, 0.5]);
    });
    key('left', function(){
      game.ship.power([-0.5, 0]);
    });
    key('right', function(){
      game.ship.power([0.5, 0]);
    });
    key('space', function(){
      game.fireBullet();
    });
  }
  Game.prototype.step = function(){
    this.move();
    this.draw();
  };

  Game.prototype.start = function(){
    var game = this;
    game.bindKeyHandlers();
    this.heartbeat = setInterval(function(){
      game.step();
    }, Game.FPS);
  };

  Game.prototype.checkCollisions = function(){
    var game = this;
    this.asteroids.forEach(function(asteroid){
      if (game.ship.isCollidedWith(asteroid)){
        alert("Game Over!");
        game.stop();
        return
      }
    });
  };

  Game.prototype.stop = function(){
    clearInterval(this.heartbeat);
  };

  Game.prototype.fireBullet = function(){
    this.bullets.push(this.ship.fireBullet(this));
    console.log(this.bullets);
  };

  Game.prototype.removeAsteroid = function(asteroid){
    for(var i = 0; i < this.asteroids.length; i++){
      if (asteroid === this.asteroids[i]){
        this.asteroids.splice(i, 1);
        return
      }
    }
  }
  Game.prototype.removeBullet = function(bullet){
    for(var i = 0; i < this.bullets.length; i++){
      if (bullet === this.bullets[i]){
        this.bullets.splice(i, 1);
        return
      }
    }
  }
})(this);
