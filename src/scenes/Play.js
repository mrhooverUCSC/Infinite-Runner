class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('oceanBackground', './assets/tempBackground.png');
    }

    create() {
        this.oceanBackground = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'oceanBackground').setOrigin(0, 0);
    }

    update() {
        this.oceanBackground.tilePositionX += oceanSpeed;
    }
}