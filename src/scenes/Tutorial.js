class Tutorial extends Phaser.Scene {
    constructor() {
        super('tutorialScene');
    }

    preload() {
        this.load.image('oceanBackground',  './assets/images/oceanBackground.png');
        this.load.image('fishPlayer',       './assets/images/PlayersFish.png');
        this.load.audio('click', ['./assets/audio/click.wav']);
    }

    create() {
        let tutorialConfig = {
            fontFamily: 'Courier',
            fontSize: '40px',
            backgroundColor: '#F3B141',
            color: '#000000',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        this.add.tileSprite(0, 0, game.config.width, game.config.height, 'oceanBackground').setOrigin(0, 0);
        this.add.text(game.config.width / 2, 100, 'TUTORIAL', tutorialConfig).setOrigin(0.5);
        tutorialConfig.fontSize = '32px';
        this.add.text(game.config.width / 2, game.config.height / 3,
            'How to Play:\nControls - Arrow Keys\nGameplay:\nDodge incoming obstacles and answer\nas many math problems as possible.'
            , tutorialConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, game.config.height / 2 + borderUISize - 5,
            'To choose an answer for a problem given,\n follow a path corresponding to a number.\nAs the game goes on, the math questions will\nbecome progressively more difficult.'
            , tutorialConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, game.config.height - borderUISize * 2, 'Press (ENTER) To Start', tutorialConfig).setOrigin(0.5);

        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyENTER)) {
            this.sound.play('click', { volume: 0.8 });
            this.scene.start('playScene');
        }
    }
}