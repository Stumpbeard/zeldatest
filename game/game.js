var game = new Phaser.Game(160, 144, Phaser.CANVAS, '', { preload: preload, create: create, update: update });

var link;
var collisions;

function preload() {
    // scale the game 4x
    game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
    game.scale.setUserScale(5, 5);

    // enable crisp rendering
    game.renderer.renderSession.roundPixels = true;
    Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);

    game.load.image('room1', 'assets/bg/1.png');
    game.load.spritesheet('link', 'assets/char/link_spritesheet16x16.png', 16, 16, 8);
}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    collisions = game.add.group();
    collisions.enableBody = true;

    room1();

    link = game.add.sprite(64, 36, 'link');
    game.physics.arcade.enable(link);
    link.body.collideWorldBounds = true;
    link.animations.add('walkDown', [4, 0], 8, true);
    link.animations.add('walkLeft', [5, 1], 8, true);
    link.animations.add('walkRight', [6, 2], 8, true);
    link.animations.add('walkUp', [7, 3], 8, true);
    link.animations.currentAnim = link.animations.getAnimation('walkRight');
}

var speed = 60;

function update() {
    game.physics.arcade.collide(link, collisions);

    if (game.input.mousePointer.isDown) {
        console.log(Math.floor(game.input.activePointer.x) + " " + Math.floor(game.input.activePointer.y));
    }

    // player movement
    link.body.velocity.x = 0;
    link.body.velocity.y = 0;
    console.log(link.animations.currentAnim.paused);
    if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
        link.body.velocity.y = speed;
        link.animations.play('walkDown');
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
        link.body.velocity.y = -speed;
        link.animations.play('walkUp');
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
        link.body.velocity.x = speed;
        link.animations.play('walkRight');
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
        link.body.velocity.x = -speed;
        link.animations.play('walkLeft');
    }

    if (!(game.input.keyboard.isDown(Phaser.Keyboard.DOWN) || game.input.keyboard.isDown(Phaser.Keyboard.UP) || game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) || game.input.keyboard.isDown(Phaser.Keyboard.LEFT))) {
        link.animations.currentAnim.frame = 1;
        link.animations.stop();
    }
}

function room1() {
    game.add.sprite(0, 0, 'room1');

    var col1 = collisions.create(0, 0);
    col1.scale.x = 160;
    col1.scale.y = 16;
    col1.body.immovable = true;

    var col2 = collisions.create(0, 0);
    col2.scale.x = 16;
    col2.scale.y = 144;
    col2.body.immovable = true;

    var col3 = collisions.create(0, 128);
    col3.scale.x = 160;
    col3.scale.y = 16;
    col3.body.immovable = true;

    var col4 = collisions.create(144, 0);
    col4.scale.x = 16;
    col4.scale.y = 144;
    col4.body.immovable = true;

    var col5 = collisions.create(0, 112);
    col5.scale.x = 72;
    col5.scale.y = 16;
    col5.body.immovable = true;

    var col6 = collisions.create(88, 112);
    col6.scale.x = 72;
    col6.scale.y = 16;
    col6.body.immovable = true;

    var bed1 = collisions.create(16, 32);
    bed1.scale.x = 16;
    bed1.scale.y = 32;
    bed1.body.immovable = true;

    var bed2 = collisions.create(48, 32);
    bed2.scale.x = 16;
    bed2.scale.y = 32;
    bed2.body.immovable = true;
}