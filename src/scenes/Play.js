class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // Load Background
        this.load.image('oceanBackground', './assets/tempBackground.png');
        // Load Graphic Assets
        this.load.image('bubble', './assets/Bubble.png');
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

        // --- Bubble Particles ---
        // create line on right side of screen for particles source
        let line = new Phaser.Geom.Line(game.config.width, 0, game.config.width, game.config.height); 
        // create particle manager
        this.particleManager = this.add.particles('bubble');
        // add emitter and setup properties
        this.lineEmitter = this.particleManager.createEmitter({
            gravityX: -150,
            lifespan: 5000,     // how long particles last
            alpha: { start: 1.0, end: 0.0 },
            frequency: 100,     // how frequent particles spawn evert ms
            emitZone: { type: 'random', source: line, quantity: 150 },
            blendMode: 'ADD'
        });

    }

    update() {
        this.player1.update();

        this.oceanBackground.tilePositionX += oceanSpeed;
    }
}