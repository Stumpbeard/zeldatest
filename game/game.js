var game = new Phaser.Game(160, 144, Phaser.CANVAS, '', { preload: preload, create: create, update: update });

var link;

function preload() {
    // scale the game 4x
    game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
    game.scale.setUserScale(5, 5);

    // enable crisp rendering
    game.renderer.renderSession.roundPixels = true;
    Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);

    game.load.image('room1', 'assets/bg/1.png');
    game.load.spritesheet('link', 'assets/char/link_spritesheet16x16.png', 16, 16, 2);
}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.sprite(0, 0, 'room1');
    link = game.add.sprite(50, 50, 'link');
    link.animations.add('walk', [1, 0], 8, true);
}

var speed = 1;

function update() {
    if (game.input.mousePointer.isDown) {
        console.log(Math.floor(game.input.activePointer.x) + " " + Math.floor(game.input.activePointer.y));
    }

    // player movement
    if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
        link.y += speed;
        link.animations.play('walk');
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
        link.y -= speed;
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
        link.x += speed;
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
        link.x -= speed;
    }

    if (!(game.input.keyboard.isDown(Phaser.Keyboard.DOWN) || game.input.keyboard.isDown(Phaser.Keyboard.UP) || game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) || game.input.keyboard.isDown(Phaser.Keyboard.LEFT))) {
        link.animations.currentAnim.frame = 1;
        link.animations.stop();
    }
}