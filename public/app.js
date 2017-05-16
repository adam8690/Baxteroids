window.onload = function() {

        //  Note that this html file is set to pull down Phaser 2.5.0 from the JS Delivr CDN.
        //  Although it will work fine with this tutorial, it's almost certainly not the most current version.
        //  Be sure to replace it with an updated version before you start experimenting with adding your own code.

        var game = new Phaser.Game(500, 500, Phaser.AUTO, '', { preload: preload, create: create, update: update });

        var BallWorld = {
            velocity: 8
        };

// called first
        function preload () {
            // load image assets before game starts
            game.load.image('ball', 'ball.png');
        }
// called after preload
        function create () {
            // center the game on the page
            game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            game.scale.pageAlignHorizontally = true;
            game.scale.pageAlignVertically = true;

            // change background colour
            game.stage.backgroundColor = '#87CEEB';

            // add ball to middle of game area
            this.ball = game.add.sprite(game.world.centerX, game.world.centerY, 'ball');
            this.ball.anchor.set(0.5, 0.5);
            
            // add key input to the game
            this.keys = game.input.keyboard.createCursorKeys();
        }
// called once every frame (60hz)
        function update () {
        // poll arrow keys to move the ball
        if(this.keys.left.isDown){
            this.ball.x -= BallWorld.velocity
        }
        if(this.keys.right.isDown){
            this.ball.x += BallWorld.velocity
        }
        if(this.keys.down.isDown){
            this.ball.y += BallWorld.velocity
        }
        if(this.keys.up.isDown){
            this.ball.y -= BallWorld.velocity
        }
        
        // prevent the ball from leaving the boundaries of the canvas
        var halfWidth = this.ball.width / 2
        var halfHeight = this.ball.height / 2

        if((this.ball.x - halfWidth) < 0){
            this.ball.x = halfWidth;
        }
        if((this.ball.x + halfWidth) > game.width){
            this.ball.x = game.width - halfWidth;
        }
        if((this.ball.y - halfHeight) < 0){
            this.ball.y = halfHeight;
        }
        if((this.ball.y + halfHeight) > game.height){
            this.ball.y = game.height - halfHeight;
        }
        }

    };