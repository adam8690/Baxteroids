function Bullets(game){
    this.game = game;
    this.speed = 420;
    this.interval = 0;
    this.rate = 100;
    this.lifespan = 2000;
    this.maxCount = 30;
    this.bulletGroup = null;
}

Bullets.prototype.addBullets = function(){
    this.bulletGroup = this.game.add.group();
    this.bulletGroup.enableBody = true;
    this.bulletGroup.physicsBodyType = Phaser.Physics.ARCADE;
    this.bulletGroup.createMultiple(this.maxCount, 'bullet');
    this.bulletGroup.setAll('anchor.x', 0.5);
    this.bulletGroup.setAll('anchor.y', 0.5);
    this.bulletGroup.setAll('lifespan', this.lifespan);
}

