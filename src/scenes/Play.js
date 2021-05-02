class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // Load Background
        this.load.image('oceanBackground', './assets/tempBackground.png');
        // Load Graphic Assets
        this.load.image('bubble',           './assets/bubble.png');
        this.load.image('horizontal_bar',   './assets/horizontal_bar.png');
        this.load.image('spike',            './assets/spike.png');
        this.load.image('leftspike',        './assets/leftspike.png');
        // Obstacles
        this.load.image('shark',            './assets/shark.png');
        this.load.image('plasticBottle',    './assets/bottle.png');
        this.load.image('hook',             './assets/hook.png');
        this.load.image('plasticRings',     './assets/plasticRings.png');
        this.load.image('plasticBag',       './assets/plasticBag.png');
        //load font
        this.load.bitmapFont('gem', './assets/font/gem.png', './assets/font/gem.xml');
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
            frequency: 75,     // how frequent particles spawn evert ms
            emitZone: { type: 'random', source: line, quantity: 150 },
            blendMode: 'ADD'
        });

        // Enemy List
        this.listOfEnemies = ['shark', 'plasticBottle', 'hook', 'plasticRings', 'plasticBag'];
        // Enemy Group
        this.enemyGroup = this.add.group({
            runChildUpdate: true
        });
        // First Enemy Spawns
        this.time.delayedCall(5000, () => {
            this.addEnemy();
        });

        //Math Question Spawner
        this.questionTimer = this.time.addEvent({
            delay: 15000,
            callback: this.setupQuestion,
            callbackScope: this,
            loop: true
        });
    }

    update() {
        this.player1.update();

        this.oceanBackground.tilePositionX += oceanSpeed;
    }

    addEnemy() {
        let randomEnemy = Phaser.Math.Between(0, 4);
        let randomY = Phaser.Math.Between(0, game.config.height);
        let newEnemy = new Obstacle(this, game.config.width,
                           randomY, this.listOfEnemies[randomEnemy]).setOrigin(0.5, 0);
        this.enemyGroup.add(newEnemy);
    }

    setupQuestion(){
        //obstacle pattern
        this.safe = Phaser.Math.Between(0,2);
        console.log(this.safe);
        if(this.safe == 0){
            //0 safe, no spike
            this.spike1 = new Obstacle(this, game.config.width * 2.4, game.config.height / 3 + 6, 'spike').setOrigin(0.5, 0); //1 not safe
            this.spike2 = new Obstacle(this,game.config.width * 2.4, 2 * game.config.height / 3 + 6, 'spike').setOrigin(0.5, 0); //2 not safe
        }
        else if(this.safe != 1){
            //1 safe, no spike
            this.spike0 = new Obstacle(this, game.config.width * 2.4, 6, 'spike').setOrigin(0.5, 0); //0 not safe
            this.spike2 = new Obstacle(this,game.config.width * 2.4, 2 * game.config.height / 3 + 6, 'spike').setOrigin(0.5, 0); //2 not safe
        }
        else{
            //2 safe, no spike
            this.spike0 = new Obstacle(this, game.config.width * 2.4, 6, 'spike').setOrigin(0.5, 0); //0 not safe
            this.spike1 = new Obstacle(this, game.config.width * 2.4, game.config.height / 3 + 6, 'spike').setOrigin(0.5, 0); //1 not safe
        }
        this.wall1 = new Obstacle(this, game.config.width * 2, game.config.height / 3, 'horizontal_bar').setOrigin(0.5, 0);
        this.wall2 = new Obstacle(this, game.config.width * 2, 2 * game.config.height / 3, 'horizontal_bar').setOrigin(0.5, 0);
    }
}