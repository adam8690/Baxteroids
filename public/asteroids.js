function Asteroids(game){
    this.game = game;
    this.startingAsteroids = 2;
    this.maxAsteroids = 20;
    this.incrementAsteroids = 2;
    this.score = 0;
    this.scoreText = null;
    this.asteroidGroup = null;
    this.asteroidLarge = {
        minVelocity: 50,
        maxVelocity: 150,
        minAngularVelocity: 0,
        maxAngularVelocity: 200,
        score: 20,
        nextSize: 'asteroidMedium',
        pieces: 2,
    };
    this.asteroidMedium = {
        minVelocity: 50,
        maxVelocity: 150,
        minAngularVelocity: 0, 
        maxAngularVelocity: 200,
        score: 35,
        nextSize: 'asteroidSmall',
        pieces: 2,
    };
    this.asteroidSmall = {
        minVelocity: 50,
        maxVelocity: 150,
        minAngularVelocity: 0, 
        maxAngularVelocity: 200,
        score: 50,
    };
}

Asteroids.prototype.addAsteroids = function(){
    this.asteroidGroup = this.game.add.group()
    this.asteroidGroup.enableBody = true;
    this.asteroidGroup.physicsBodyType = Phaser.Physics.ARCADE;
    

    for(i=0; i < this.startingAsteroids; i++){
        var x = Math.random() * this.game.width;
        var y = Math.random() * this.game.height;
        this.createAsteroid(x , y, 'asteroidLarge');
    }
}


Asteroids.prototype.createAsteroid = function (x, y, size, pieces){

    if(pieces === undefined){ pieces = 1 }

    for(var i=0; i < pieces; i++){
        var asteroid = this.asteroidGroup.create(x , y, size)
        asteroid.anchor.set(0.5, 0.5);
        asteroid.body.angularVelocity = this.game.rnd.integerInRange(this[size].minAngularVelocity, this[size].maxAngularVelocity);

        var randomAngle = this.game.math.degToRad(this.game.rnd.angle());
        var randomVelocity = this.game.rnd.integerInRange(this[size].minVelocity, this[size].maxVelocity);

        this.game.physics.arcade.velocityFromRotation(randomAngle, randomVelocity, asteroid.body.velocity);
    }
}

Asteroids.prototype.nextLevel = function(){
    this.game.time.events.add(Phaser.Timer.SECOND * 2, this.addAsteroids, this);
}

Asteroids.prototype.checkLevelComplete = function(){
        if(!this.asteroidGroup.countLiving()){
        this.asteroidGroup.removeAll(true);
        this.startingAsteroids += this.incrementAsteroids
        this.nextLevel()
    }
}


// called when a bullet hits an asteroid
Asteroids.prototype.destroy = function(asteroid){
    
    this.score += this[asteroid.key].score;
    this.checkLevelComplete()

    if(this[asteroid.key].nextSize){
    var nextAsteroidSize = this[asteroid.key].nextSize
    this.createAsteroid(asteroid.worldPosition.x, asteroid.worldPosition.y, nextAsteroidSize, this[asteroid.key].pieces)
    }
}


Asteroids.prototype.asteroidCollision = function(target, asteroid){
    
    target.kill();
    asteroid.kill();

    if(this.ship){
        this.ship.destroy()
    }
    else{
        this.asteroids.destroy(asteroid)
    }
}