class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        this.load.image('fishPlayer',       './assets/images/PlayersFish.png');
        this.load.image('oceanBackground',  './assets/images/oceanBackground.png');

        this.load.audio('click', ['./assets/audio/click.wav']);
    }

    create() {
        // background
        this.oceanBackground = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'oceanBackground').setOrigin(0, 0);
        // menu text configuration
        let menuConfig = {
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
        
        // show menu text
        this.add.text(game.config.width/2, game.config.height/3 - borderUISize, 'InFinite Math', menuConfig).setOrigin(0.5);
        menuConfig.fontSize = '20px';
        this.add.text(game.config.width/2, game.config.height/3 + borderPadding * 2,
            'You Must Dodge Incoming Obstacles & Answer\nThe Correct Math Problems Prompted!', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize + borderPadding * 2, 'Press (ENTER) to Start', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        menuConfig.fontSize = '30px';
        // score text
        this.add.text(game.config.width /2, game.config.height - borderUISize,
            `High Score: ${highScore} / Highest Time Lasted: ${highestTimeLasted}`, menuConfig).setOrigin(0.5);
        // fish cursor
        this.fishCursor = this.add.image(game.config.width / 3, game.config.height - borderUISize * 6, 'fishPlayer');
        // menu
        this.playText = this.add.text(game.config.width / 2, game.config.height - borderUISize * 6, 'Play', menuConfig).setOrigin(0.5);
        this.tutorialText = this.add.text(game.config.width / 2, game.config.height - borderUISize * 4, 'Tutorial', menuConfig).setOrigin(0.5);
        // key inputs
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        // list of scenes
        this.listScene = ['playScene', 'tutorialScene'];
        this.sceneIndex = 0;
    }

    update() {
        // moving around the screen
        if(Phaser.Input.Keyboard.JustDown(keyUP) || Phaser.Input.Keyboard.JustDown(keyDOWN)) {
            if(this.sceneIndex == 0) {      // sets tutorial scene
                this.sceneIndex = 1;
                this.fishCursor.y = this.tutorialText.y;
            } else {                        // sets play scene
                this.sceneIndex = 0;
                this.fishCursor.y = this.playText.y;
            }
            this.sound.play('click', { volume: 0.8 });
        }

        if(Phaser.Input.Keyboard.JustDown(keyENTER)) {   // enter play scene
            this.sound.play('click', { volume: 0.8 });
            this.scene.start(this.listScene[this.sceneIndex]);
        }
    }

}