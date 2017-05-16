window.onload = function() {

        //  Note that this html file is set to pull down Phaser 2.5.0 from the JS Delivr CDN.
        //  Although it will work fine with this tutorial, it's almost certainly not the most current version.
        //  Be sure to replace it with an updated version before you start experimenting with adding your own code.

        var game = new Phaser.Game(500, 500, Phaser.AUTO, '', { preload: preload, create: create, update: update });

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
            game.add.sprite(game.world.centerX, game.world.centerY, 'ball');
            this.ball.anchor.set(0.5, 0.5);
        }
// called once every frame (60hz)
        function update () {

        }

    };