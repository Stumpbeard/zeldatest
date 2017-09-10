var game = new Phaser.Game(160, 144, Phaser.CANVAS, '', { preload: preload, create: create, update: update, redner: render });

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

var keyUp;
var keyDown;
var keyLeft;
var keyRight;

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    collisions = game.add.group();
    collisions.enableBody = true;

    room1();

    link = game.add.sprite(64, 36, 'link');
    game.physics.arcade.enable(link);
    link.body.setSize(8, 10, 4, 6);
    link.body.collideWorldBounds = true;
    link.animations.add('walkDown', [4, 0], 8, true);
    keyDown = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    keyDown.onUp.add(function() {
        link.animations.stop();
    });
    link.animations.add('walkLeft', [5, 1], 8, true);
    keyLeft = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    keyLeft.onUp.add(function() {
        link.animations.stop();
    });
    link.animations.add('walkRight', [6, 2], 8, true);
    keyRight = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    keyRight.onUp.add(function() {
        link.animations.stop();
    });
    link.animations.add('walkUp', [7, 3], 8, true);
    keyUp = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    keyUp.onUp.add(function() {
        link.animations.stop();
    });
    link.animations.currentAnim = link.animations.getAnimation('walkRight');
}

var speed = 60;

function update() {
    game.physics.arcade.collide(link, collisions);

    if (game.input.mousePointer.isDown) {
        console.log(Math.floor(game.input.activePointer.x) + " " + Math.floor(game.input.activePointer.y));
    }

    var yCancel = false;
    var xCancel = false;

    if (keyUp.isDown && keyDown.isDown) {
        if (!(keyRight.isDown || keyLeft.isDown)) {
            link.animations.currentAnim.frame = 1;
            link.animations.stop();
        }
        yCancel = true;
    }

    if (keyRight.isDown && keyLeft.isDown) {
        if (!(keyUp.isDown || keyDown.isDown)) {
            link.animations.currentAnim.frame = 1;
            link.animations.stop();
        }
        xCancel = true;
    }

    // player movement
    link.body.velocity.x = 0;
    link.body.velocity.y = 0;
    if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
        link.body.velocity.y += speed;
        if (!link.animations.currentAnim.isPlaying && !yCancel) link.animations.play('walkDown');
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
        link.body.velocity.y -= speed;
        if (!link.animations.currentAnim.isPlaying && !yCancel) link.animations.play('walkUp');
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
        link.body.velocity.x += speed;
        if (!link.animations.currentAnim.isPlaying && !xCancel) link.animations.play('walkRight');
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
        link.body.velocity.x -= speed;
        if (!link.animations.currentAnim.isPlaying && !xCancel) link.animations.play('walkLeft');
    }

    if (!(game.input.keyboard.isDown(Phaser.Keyboard.DOWN) || game.input.keyboard.isDown(Phaser.Keyboard.UP) || game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) || game.input.keyboard.isDown(Phaser.Keyboard.LEFT))) {
        link.animations.currentAnim.frame = 1;
        link.animations.stop();
    }
}

function render() {
    // game.debug.bodyInfo(link, 32, 32);
    // game.debug.body(link);
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

    var cabinet = collisions.create(112, 16);
    cabinet.scale.x = 16;
    cabinet.scale.y = 8;
    cabinet.body.immovable = true;

    var boxes = collisions.create(128, 16);
    boxes.scale.x = 16;
    boxes.scale.y = 32;
    boxes.body.immovable = true;

    var seats = collisions.create(128, 64);
    seats.scale.x = 16;
    seats.scale.y = 48;
    seats.body.immovable = true;

    var table = collisions.create(112, 80);
    table.scale.x = 32;
    table.scale.y = 16;
    table.body.immovable = true;
}