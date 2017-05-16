function Asteroids(game){
    this.game = game;
    this.startingAsteroids = 4;
    this.maxAsteroids = 20;
    this.incrementAsteroids = 2;
    this.asteroidGroup = null;
    this.asteroidLarge = {
        minVelocity: 50,
                maxVelocity: 150,
                minAngularVelocity: 0, 
                maxAngularVelocity: 200,
                score: 20,
                nextSize: 'asteroidMedium'
    };
    this.asteroidMedium = {
         minVelocity: 50,
                maxVelocity: 150,
                minAngularVelocity: 0, 
                maxAngularVelocity: 200,
                score: 35,
                nextSize: 'asteroidSmall'
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

    this.createAsteroid(0.25 , 0.25, 'asteroidLarge');
    this.createAsteroid(0.75 , 0.75, 'asteroidLarge');
    
}


Asteroids.prototype.createAsteroid = function (x, y, size){
    var asteroid = this.asteroidGroup.create(x , y, size)
    asteroid.anchor.set(0.5, 0.5);
    asteroid.body.angularVelocity = this.game.rnd.integerInRange(this[size].minAngularVelocity, this[size].maxAngularVelocity);

    var randomAngle = this.game.math.degToRad(this.game.rnd.angle());
    var randomVelocity = this.game.rnd.integerInRange(this[size].minVelocity, this[size].maxVelocity);

    this.game.physics.arcade.velocityFromRotation(randomAngle, randomVelocity, asteroid.body.velocity);
}