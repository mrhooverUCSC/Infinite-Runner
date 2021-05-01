class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('oceanBackground', './assets/tempBackground.png');
    }

    create() {
        // Ocean Background
        this.oceanBackground = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'oceanBackground').setOrigin(0, 0);
        // Player
        this.player1 = new Fish(this, game.config.width / 2, game.config.height / 2, 'fishPlayer').setOrigin(0.5, 0);
        // Controls for the Scene
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    }

    update() {
        this.player1.update();

        this.oceanBackground.tilePositionX += oceanSpeed;
    }
}