var game = new Phaser.Game(160, 144, Phaser.CANVAS, '', { preload: preload, create: create, update: update });

function preload() {
    // scale the game 4x
    game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
    game.scale.setUserScale(5, 5);

    // enable crisp rendering
    game.renderer.renderSession.roundPixels = true;
    Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);

    game.load.image('room1', 'assets/bg/1.png');
}

function create() {
    // game.plugins.add(Phaser.Plugin.PixelScaler, 5);
    game.add.sprite(0, 0, 'room1');
}

function update() {
    if (game.input.mousePointer.isDown) {
        console.log(Math.floor(game.input.activePointer.x) + " " + Math.floor(game.input.activePointer.y));
    }
}