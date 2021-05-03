class GameOver extends Phaser.Scene {
    constructor() {
        super('gameOverScene');
    }

    preload() {
        this.load.image('oceanBackground', './assets/tempBackground.png');
    }

    create() {
        this.oceanBackground = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'oceanBackground').setOrigin(0, 0);

        let textConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        // Game Over text
        this.add.text(game.config.width / 2, game.config.height / 2 - borderUISize, 'GAME OVER', textConfig).setOrigin(0.5);
        // High Score
        this.add.text(game.config.width / 2, game.config.height / 2 + borderUISize, `High Score: ${highScore}`, textConfig).setOrigin(0.5);
        // Time Lasted
        this.add.text(game.config.width / 2, game.config.height / 2 + borderUISize * 2, `Highest Time Lasted: ${timeLasted} Seconds`, textConfig).setOrigin(0.5);
    }

    update() {
    }
}