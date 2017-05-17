function Ship(game){
    this.game = game;
    this.angularVelocity = 300;
    this.acceleration = 300;
    this.drag = 100;
    this.maxVelocity = 400;
    this.sprite = null;
    this.startingLives = 3;
    this.livesText = null;
    this.timeToReset = 3;
    this.timeInvulnerable = 3;
    this.isInvulnerable = false;
}

Ship.prototype.addSprite = function(){
    this.sprite = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'ship');
    this.sprite.anchor.set(0.5, 0.5)
    this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE)
    this.sprite.body.drag.set(this.drag);
    this.sprite.body.maxVelocity.set(this.maxVelocity);
    // display the number of lives the ship has in top corner.
    this.livesText = this.game.add.text(20, 20, "Lives: " + this.startingLives, {font: '20px Arial', fill: '#FFFFFF', align: 'center'})
    this.livesText.anchor.set(0,0);
}

Ship.prototype.resetShip = function(){
    this.sprite.reset(this.game.world.centerX, this.game.world.centerY);
}

Ship.prototype.gameOver = function(){
    var style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" }
    var gameOverText = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "Game Over", style)
    gameOverText.anchor.set(0.5)
}

// called when the ship hits an asteroid
Ship.prototype.destroy = function(){
    this.startingLives --;
    this.livesText.setText("Lives: " + this.startingLives)
    if(this.startingLives > 0){
        this.resetShip();
    }
    else{
        this.gameOver();
    }
}