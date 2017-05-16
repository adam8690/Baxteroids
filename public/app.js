window.onload = function() {

        var game = new Phaser.Game(500, 500, Phaser.AUTO, '', { preload: preload, create: create, update: update });

        var Baxteroids = {
            // velocity: 8
        };

// called first
        function preload () {
            // load image assets before game starts
            game.load.image('ship', 'ship.png');
            game.load.image('bullet', 'bullet.png');
        }
// called after preload
        function create () {
            // center the game on the page
            game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            game.scale.pageAlignHorizontally = true;
            game.scale.pageAlignVertically = true;

            // change background colour
            game.stage.backgroundColor = '#000000';

            // add ball to middle of game area
            this.ship = game.add.sprite(game.world.centerX, game.world.centerY, 'ship');
            this.ship.anchor.set(0.5, 0.5);
            
            // add key input to the game
            this.keys = game.input.keyboard.createCursorKeys();
        }
// called once every frame (60hz)
        function update () {
            // poll arrow keys to move the ball
            if(this.keys.left.isDown){
                this.ship.x -= Baxteroids.velocity
            }
            if(this.keys.right.isDown){
                this.ship.x += Baxteroids.velocity
            }
            if(this.keys.down.isDown){
                this.ship.y += Baxteroids.velocity
            }
            if(this.keys.up.isDown){
                this.ship.y -= Baxteroids.velocity
            }
            
        // prevent the ball from leaving the boundaries of the canvas
        var halfWidth = this.ship.width / 2
        var halfHeight = this.ship.height / 2

            if((this.ship.x - halfWidth) < 0){
                this.ship.x = halfWidth;
            }
            if((this.ship.x + halfWidth) > game.width){
                this.ship.x = game.width - halfWidth;
            }
            if((this.ship.y - halfHeight) < 0){
                this.ship.y = halfHeight;
            }
            if((this.ship.y + halfHeight) > game.height){
                this.ship.y = game.height - halfHeight;
            }
        }

    };