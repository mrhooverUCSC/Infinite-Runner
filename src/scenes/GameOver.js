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
            color: '#000000',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        // Game Over text
        this.gameOverText = this.add.text(game.config.width / 2, game.config.height / 2 - borderUISize, 'GAME OVER', textConfig).setOrigin(0.5);
        // Correct Answer text
        if(promptShowing) {
            this.correctAnswer = this.add.text(game.config.width / 2, game.config.height / 2 + borderUISize, `Correct Answer: ${correctAnswerText}`, textConfig).setOrigin(0.5);
        }
        // High Score
        this.hiScoreText = this.add.text(game.config.width / 2, game.config.height / 2 + borderUISize * 2, `High Score: ${highScore} Questions`, textConfig).setOrigin(0.5);
        // Time Lasted
        this.timeScoreText = this.add.text(game.config.width / 2, game.config.height / 2 + borderUISize * 4, `Highest Time Lasted: ${timeLasted} Seconds`, textConfig).setOrigin(0.5);

        // sets a little timer to show the credits before it starts to scroll
        this.scrollCredits = false;
        this.time.delayedCall(5000, () => { this.scrollCredits = true; });
    }

    // update
    update() {
        if(this.scrollCredits == true) {
            this.gameOverText.y -= 1;
            this.hiScoreText.y -= 1;
            this.timeScoreText.y -= 1;
            if(promptShowing) {
                this.correctAnswer.y -= 1;
            }
        }
    }
}