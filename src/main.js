let config = {
    type: Phaser.CANVAS,
    width: 960,
    height: 640,
    scene: [ Menu ]
}

let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
