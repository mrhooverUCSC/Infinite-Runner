class GameOver extends Phaser.Scene {
    constructor() {
        super('gameOverScene');
    }

    preload() {
        this.load.image('oceanBackground',  './assets/images/oceanBackground.png');
        this.load.image('bubble',           './assets/images/Bubble.png');
        this.load.audio('click',            './assets/audio/click.wav');
    }

    create() {
        // key binds
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        this.add.tileSprite(0, 0, game.config.width, game.config.height, 'oceanBackground').setOrigin(0, 0);

        let textConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#000000',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        // --- Bubble Particles ---
        // create line on right side of screen for particles source
        let line = new Phaser.Geom.Line(0, game.config.height, game.config.width, game.config.height); 
        // create particle manager
        this.particleManager = this.add.particles('bubble');
        // add emitter and setup properties
        this.lineEmitter = this.particleManager.createEmitter({
            gravityY: -150,
            lifespan: 4000,     // how long particles last
            alpha: { start: 1.0, end: 0.0 },
            frequency: 50,     // how frequent particles spawn evert ms
            emitZone: { type: 'random', source: line, quantity: 150 },
            blendMode: 'ADD'
        });
        this.lineEmitter.stop();

        // Game Over text
        this.gameOverText = this.add.text(game.config.width / 2, game.config.height / 2 - borderUISize, 'GAME OVER', textConfig).setOrigin(0.5);
        // Correct Answer text
        if(promptShowing) {
            this.correctAnswer = this.add.text(game.config.width / 2, game.config.height / 2 + borderUISize, `Correct Answer: ${correctAnswerText}`, textConfig).setOrigin(0.5);
        }

        // Score        
        let scoreText = `Answered: ${currentScore} Questions\nTime Lasted: ${currentTime} Seconds`;
        this.currScore = this.add.text(game.config.width/ 2, game.config.height / 2 + borderUISize * 2, scoreText, textConfig).setOrigin(0.5);
        let hiScoreText = `High Score: ${highScore} Questions\nHighest Time Lasted: ${highestTimeLasted} Seconds`;
        this.hiScore = this.add.text(game.config.width / 2, game.config.height / 2 + borderUISize * 4, hiScoreText, textConfig).setOrigin(0.5);

        // Credits
        textConfig.fontSize = '40px';
        this.gameTitle = this.add.text(game.config.width / 2, game.config.height + borderUISize * 5, 'InFinite Runner', textConfig).setOrigin(0.5);
        textConfig.fontSize = '28px';
        let nameString = "Team: Iron Sites\nMusic and Programming: Matthew Hoover\nArt: Alejandro Silva\nProgramming: Ivan Martinez-Arias";
        this.teamNames = this.add.text(game.config.width / 2, game.config.height + borderUISize * 10, nameString, textConfig).setOrigin(0.5);

        // sets a little timer to show the credits before it starts to scroll
        this.scrollCredits = false;
        this.restartPrompt = false;
        this.time.delayedCall(5000, () => { this.scrollCredits = true; this.lineEmitter.start(); });
        // sets a timer to stop the text from scrolling and to add more things
        this.time.delayedCall(15500, () => {
            this.lineEmitter.stop();
            this.scrollCredits = false;
            textConfig.backgroundColor = '#FF0000';
            this.add.text(game.config.width / 2, game.config.height / 2,
                'Press (R) To Restart the Game or\nPress (ENTER) To Go To Main Menu', textConfig).setOrigin(0.5);
        });
    }

    // update
    update() {
        if(this.scrollCredits == true) {
            this.gameOverText.y -= 1;
            this.currScore.y -= 1;
            this.hiScore.y -= 1;
            if(promptShowing) {
                this.correctAnswer.y -= 1;
            }
            this.gameTitle.y -= 1;
            this.teamNames.y -= 1;
        }

        if(Phaser.Input.Keyboard.JustDown(keyENTER)) {   // enter menu scene
            this.sound.play('click', { volume: 0.8 });
            this.scene.start('menuScene');
        } else if(Phaser.Input.Keyboard.JustDown(keyR)) {   // enter play scene
            this.sound.play('click', { volume: 0.8 });
            this.scene.start('playScene');
        }
    }
}