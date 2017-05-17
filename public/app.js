window.onload = function() {

        var game = new Phaser.Game(500, 500, Phaser.AUTO, '', {preload: preload, create: create, update: update});

        var bullets = new Bullets(game);
        var asteroids = new Asteroids(game);
        var ship = new Ship(game);

        var gameState = {
            shipLives: ship.startingLives,
        };

// called first
        function preload () {
            // load image assets before game starts
            game.load.image('ship', 'assets/ship.png');
            game.load.image('bullet', 'assets/bullet.png');
            game.load.image('asteroidSmall', 'assets/asteroidSmall.png');
            game.load.image('asteroidMedium', 'assets/asteroidMedium.png');
            game.load.image('asteroidLarge', 'assets/asteroidLarge.png');
        }

// called after preload
        function create () {

            // center the game on the page
            game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            game.scale.pageAlignHorizontally = true;
            game.scale.pageAlignVertically = true;

            // change background colour
            game.stage.backgroundColor = '#000000';

            // start game physics
            game.physics.startSystem(Phaser.Physics.ARCADE);

            // add ship to middle of game area
            ship.addSprite();

            // add bullets to game
            bullets.addBullets();
            
            // add asteroids
            asteroids.addAsteroids()
            asteroids.scoreText = this.game.add.text(this.game.width - 100, 20, this.score, {font: '20px Arial', fill: '#FFFFFF', align: 'center'})
            // add key input to the game
            this.key_left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
            this.key_right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
            this.key_thrust = game.input.keyboard.addKey(Phaser.Keyboard.UP);
            this.key_fire = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        }

    // called once every frame (60hz)
        function update () {
            
            // keep score updated
            asteroids.scoreText.setText(asteroids.score);

            // poll arrow keys to move the ship
            // checkForInput()
            if(this.key_left.isDown){
                ship.sprite.body.angularVelocity = -ship.angularVelocity;
            }
            else if(this.key_right.isDown){
                ship.sprite.body.angularVelocity = ship.angularVelocity;
            }
            else(ship.sprite.body.angularVelocity = 0);

            if(this.key_thrust.isDown){
                // ship rotation has to be offset by 270 degrees(1.5*pi rads) so that forwards is in the direction of its pointy end
                game.physics.arcade.accelerationFromRotation((ship.sprite.rotation + 4.71), ship.acceleration, ship.sprite.body.acceleration)
            }
            else(ship.sprite.body.acceleration.set(0));

            // bullets key
            if(this.key_fire.isDown){
                if(game.time.now > bullets.interval){
                    // get the first item in the bulletGroup, false argument retrieves one that does not already exist.
                    var bullet = bullets.bulletGroup.getFirstExists(false)

                    if(bullet){
                        var length = ship.sprite.width * 0.5;
                        var x = ship.sprite.x +  (Math.cos(ship.sprite.rotation + 4.71) * length);
                        var y = ship.sprite.y +  (Math.sin(ship.sprite.rotation + 4.71) * length);

                        bullet.rotation = (ship.sprite.rotation + 4.71);

                        bullet.reset(x, y);
                        bullet.lifespan = bullets.lifespan;
                        bullet.rotation = (ship.sprite.rotation + 4.71);

                        game.physics.arcade.velocityFromRotation((ship.sprite.rotation + 4.71), bullets.speed, bullet.body.velocity);
                        bullets.interval = game.time.now + bullets.rate;
                        
                    }
                }
            }
        bullets.bulletGroup.forEachExists(screenWrap, this);
        asteroids.asteroidGroup.forEachExists(screenWrap, this);
        screenWrap(ship.sprite)

        game.physics.arcade.overlap(bullets.bulletGroup, asteroids.asteroidGroup, asteroids.asteroidCollision, null, {this: this, asteroids: asteroids})
        game.physics.arcade.overlap(ship.sprite, asteroids.asteroidGroup, asteroids.asteroidCollision, null, {this: this, ship: ship})

        }
        // make sprites reappear at opposite side of canvas when they leave the screen
        function screenWrap(sprite){
            if(sprite.x < 0){
                sprite.x = game.width;
            }
            else if(sprite.x > game.width){
                sprite.x = 0;
            }

            if(sprite.y < 0){
                sprite.y = game.height;
            }
            else if(sprite.y > game.height){
                sprite.y = 0;
            }
        }

        function checkForInput(){
            if(this.keys.left.isDown){
                ship.sprite.body.angularVelocity = -ship.angularVelocity;
            }
            else if(this.keys.right.isDown){
                ship.sprite.body.angularVelocity = ship.angularVelocity;
            }
            else(ship.sprite.body.angularVelocity = 0);

            if(this.keys.up.isDown){
                // ship rotation has to be offset by 270 degrees(1.5*pi rads) so that forwards is in the direction of its pointy end
                game.physics.arcade.accelerationFromRotation((ship.sprite.rotation + 4.71), ship.acceleration, ship.sprite.body.acceleration)
            }
            else(ship.sprite.body.acceleration.set(0));

            // bullets key
            if(this.keys.down.isDown){
                if(game.time.now > bullets.interval){
                    // get the first item in the bulletGroup, false argument retrieves one that does not already exist.
                    var bullet = bullets.bulletGroup.getFirstExists(false)

                    if(bullet){
                        var length = ship.sprite.width * 0.5;
                        var x = ship.sprite.x +  (Math.cos(ship.sprite.rotation + 4.71) * length);
                        var y = ship.sprite.y +  (Math.sin(ship.sprite.rotation + 4.71) * length);

                        bullet.rotation = (ship.sprite.rotation + 4.71);

                        bullet.reset(x, y);
                        bullet.lifespan = bullets.lifespan;
                        bullet.rotation = (ship.sprite.rotation + 4.71);

                        game.physics.arcade.velocityFromRotation((ship.sprite.rotation + 4.71), bullets.speed, bullet.body.velocity);
                        bullets.interval = game.time.now + bullets.rate;
                        
                    }
                }
            }
        }

    };