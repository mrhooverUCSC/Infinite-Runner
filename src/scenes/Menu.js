class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        this.load.image('fishPlayer', './assets/PlayersFish.png');
        this.load.image('oceanBackground', './assets/oceanBackground.png');
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
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        
        // show menu text
        this.add.text(game.config.width/2, game.config.height/3 - borderUISize, 'Infinite Math', menuConfig).setOrigin(0.5);
        menuConfig.fontSize = '20px';
        this.add.text(game.config.width/2, game.config.height/3 + borderPadding, 'Controls: Arrow Keys', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'Avoid the Obstacles and Swim Down the Correct Tunnel', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize + borderPadding * 2, 'Press ENTER to go into Play Scene', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        menuConfig.fontSize = '30px';
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
        }

        if(Phaser.Input.Keyboard.JustDown(keyENTER)) {   // enter play scene
            this.scene.start(this.listScene[this.sceneIndex]);
        }
    }

}