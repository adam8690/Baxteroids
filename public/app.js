window.onload = function() {

        var game = new Phaser.Game(500, 500, Phaser.AUTO, '', {preload: preload, create: create, update: update});

        var bullets = new Bullets(game);
        var asteroids = new Asteroids(game);
        var ship = new Ship(game);

        var gameState = {
            asteroidCount: null,
            bulletInterval: 0
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

            // the number of asteroids on screen
            gameState.asteroidCount = asteroids.startingAsteroids;
            
            // createAsteroid(0.25, 0.25, 'asteroidLarge');
    
            // add key input to the game
            this.keys = game.input.keyboard.createCursorKeys();
        }

        // called once every frame (60hz)
        function update () {
            // poll arrow keys to move the ship
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
                        bullets.interval = game.time.now + 100;
                        
                    }
                }
            }
        bullets.bulletGroup.forEachExists(screenWrap, this);
        asteroids.asteroidGroup.forEachExists(screenWrap, this);
        screenWrap(ship.sprite)
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

        function createAsteroid(x, y, size){
            var asteroid = this.asteroidGroup.create(x , y, size)
            asteroid.anchor.set(0.5, 0.5);
            asteroid.body.angularVelocity = game.rnd.integerInRange(asteroidProperties[size].minAngularVelocity, asteroidProperties[size].maxAngularVelocity);

            var randomAngle = game.math.degToRad(game.rnd.angle());
            var randomVelocity = game.rnd.integerInRange(asteroidProperties[size].minVelocity, asteroidProperties[size].maxVelocity);

            game.physics.arcade.velocityFromRotation(randomAngle, randomVelocity, asteroid.body.velocity);
        }

    };