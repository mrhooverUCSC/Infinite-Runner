class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        this.load.image('fishPlayer', './assets/PlayersFish.png');
        this.load.image('horizontal_bar', './assets/horizontal_bar.png');
    }

    create() {
        // menu text configuration
        let menuConfig = {
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
        
        // show menu text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'Infinite Math', menuConfig).setOrigin(0.5);
        menuConfig.fontSize = '20px';
        menuConfig.color = 
        this.add.text(game.config.width/2, game.config.height/2 - borderPadding, 'Controls: Arrow Keys', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize - borderPadding, 'Avoid the Obstacles and Swim Down the Correct Tunnel', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'Press ENTER to go into Play Scene', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';

        this.question = new Question(3);
        this.question.check_equation();
        //console.log(this.question.result);

        this.player1 = new Fish(this, game.config.width / 2, game.config.height / 2 + borderUISize, 'fishPlayer').setOrigin(0.5, 0);
        new Obstacle(this, 2 * game.config.width/3, game.config.height / 2, 'horizontal_bar').setOrigin(0.5, 0);

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

//        this.question = new Question();
//        this.question.equation();
    }

    update() {
        this.player1.update();

        if(Phaser.Input.Keyboard.JustDown(keyENTER)) {   // enter play scene
            this.scene.start('playScene');
        }
    }

}