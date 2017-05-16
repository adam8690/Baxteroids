function Ship(game){
    this.game = game;
    this.angularVelocity = 300;
    this.acceleration = 300;
    this.drag = 100;
    this.maxVelocity = 400;
    this.sprite = null;
    this.startingLives = 3;
    this.timeToReset = 3;
}

Ship.prototype.addSprite = function(){
    this.sprite = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'ship');
    this.sprite.anchor.set(0.5, 0.5)
    this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE)
    this.sprite.body.drag.set(this.drag);
    this.sprite.body.maxVelocity.set(this.maxVelocity);  
}