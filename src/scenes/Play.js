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
        this.difficulty = 0;
        //Left Kill Zone
        this.killZone = new Obstacle(this, 50, 0, 'leftspike').setOrigin(0.5, 0);
        this.killZone.setVelocityX(0);

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
            lifespan: 4000,     // how long particles last
            alpha: { start: 1.0, end: 0.0 },
            frequency: 75,     // how frequent particles spawn evert ms
            emitZone: { type: 'random', source: line, quantity: 150 },
            blendMode: 'ADD'
        });

        // Enemy List / Group
        this.listOfEnemies = ['shark', 'plasticBottle', 'hook', 'plasticRings', 'plasticBag'];
        this.enemyGroup = this.add.group({
            runChildUpdate: true
        });
        this.enemyGroup.add(this.killZone);  // adds kill zone to collision group
        // First Enemy Spawns
        this.time.delayedCall(5000, () => {
            this.addEnemy();
        });

        // High Score Tracker and High Score Timer
        this.scoreTimer = this.time.addEvent({
            delay: 1000,
            callback: this.timeIncrement,
            callbackScope: this,
            loop: true
        });
        this.currentScore = 0;
        this.currentTime = 0;

        // Math Question Spawner
        this.questionTimer = this.time.addEvent({
            delay: 15000,
            callback: this.setupQuestion,
            callbackScope: this,
            loop: true
        });
    }

    
    update() {
        // updates player movement
        this.player1.update();
        // moves background
        this.oceanBackground.tilePositionX += oceanSpeed;
        // checks for obstacle collision
        this.physics.world.collide(this.player1, this.enemyGroup, this.gameOverTime, null, this);
        // places collision for math walls / paths
        //this.physics.world.collide(this.player1, this.wall1, null, null, this);
        //this.physics.world.collide(this.player1, this.wall2, null, null, this);

        // spike collision
        if(typeof this.spike0 !== 'undefined'){
            if(this.checkCollision(this.player1, this.spike0)){
                this.gameOverTime();
            }
        }
        if(typeof this.spike1 !== 'undefined'){
            if(this.checkCollision(this.player1, this.spike1)){
                this.gameOverTime();
            }
        }
        if(typeof this.spike2 !== 'undefined'){
            if(this.checkCollision(this.player1, this.spike2)){
                this.gameOverTime();
            }
        }
/*        if(this.checkCollision(this.killZone, this.player1)){
            this.gameOverTime();
        }
*/
        // checks if there is a new high score yet
        if(this.currentScore > highScore) {
            highScore = this.currentScore;
        }
        if(this.currentTime > timeLasted) {
            timeLasted = this.currentTime;
        }
    }

    // checks collision
    checkCollision(obj1, obj2){
        if (obj1.x < obj2.x + obj2.width && 
            obj1.x + obj1.width > obj2.x && 
            obj1.y < obj2.y + obj2.height &&
            obj1.height + obj1.y > obj2.y) {
                return true;
        } else {
            return false;
        }
    }

    // adds a new enemy
    addEnemy() {
        let randomEnemy = Phaser.Math.Between(0, 4);
        let randomY = Phaser.Math.Between(borderPadding, game.config.height - borderUISize * 2 - borderPadding);
        let newEnemy = new Obstacle(this, game.config.width,
                           randomY, this.listOfEnemies[randomEnemy]).setOrigin(0.5, 0);
        this.enemyGroup.add(newEnemy);
    }

    // keeps track of how much time has passed
    timeIncrement() {
        this.currentTime++;
    }

    // once there is collision against an obstacle
    gameOverTime() {
        this.player1.destroy();
        this.scene.start('gameOverScene');
    }

    // Sets up and creates a new question
    setupQuestion(){
        promptShowing = true;   // currently a prompt on the scene

        this.question = new Question(Math.floor(this.difficulty));
        this.difficulty += 0.5
        let answer0, answer1, answer2;
        //question
        let text = this.add.bitmapText(game.config.width, game.config.height/2, 'gem', this.question.q, 32).setOrigin(0.5).setTint(0xff0000);
        //obstacle pattern and answers
        this.safe = Phaser.Math.Between(0,2);
        console.log(this.safe);
        if(this.safe == 0){
            //0 safe, no spike
            this.spike1 = new Obstacle(this, game.config.width * 2.4, game.config.height / 3 + 6, 'spike').setOrigin(0.5, 0); //1 not safe
            this.spike2 = new Obstacle(this,game.config.width * 2.4, 2 * game.config.height / 3 + 6, 'spike').setOrigin(0.5, 0); //2 not safe
            answer0 = this.add.bitmapText(game.config.width * 1.5, game.config.height/5, 'gem', this.question.result, 32).setOrigin(0.5).setTint(0xff0000);
            answer1 = this.add.bitmapText(game.config.width * 1.5, game.config.height/2, 'gem', this.question.fake1, 32).setOrigin(0.5).setTint(0xff0000);
            answer2 = this.add.bitmapText(game.config.width * 1.5, 4 * game.config.height/5, 'gem', this.question.fake2, 32).setOrigin(0.5).setTint(0xff0000);
        }
        else if(this.safe != 1){
            //1 safe, no spike
            this.spike0 = new Obstacle(this, game.config.width * 2.4, 6, 'spike').setOrigin(0.5, 0); //0 not safe
            this.spike2 = new Obstacle(this,game.config.width * 2.4, 2 * game.config.height / 3 + 6, 'spike').setOrigin(0.5, 0); //2 not safe
            answer0 = this.add.bitmapText(game.config.width * 1.5, game.config.height/5, 'gem', this.question.fake1, 32).setOrigin(0.5).setTint(0xff0000);
            answer1 = this.add.bitmapText(game.config.width * 1.5, game.config.height/2, 'gem', this.question.result, 32).setOrigin(0.5).setTint(0xff0000);
            answer2 = this.add.bitmapText(game.config.width * 1.5, 4 * game.config.height/5, 'gem', this.question.fake2, 32).setOrigin(0.5).setTint(0xff0000);
        }
        else{
            //2 safe, no spike
            this.spike0 = new Obstacle(this, game.config.width * 2.4, 6, 'spike').setOrigin(0.5, 0); //0 not safe
            this.spike1 = new Obstacle(this, game.config.width * 2.4, game.config.height / 3 + 6, 'spike').setOrigin(0.5, 0); //1 not safe
            answer0 = this.add.bitmapText(game.config.width * 1.5, game.config.height/5, 'gem', this.question.fake1, 32).setOrigin(0.5).setTint(0xff0000);
            answer1 = this.add.bitmapText(game.config.width * 1.5, game.config.height/2, 'gem', this.question.fake2, 32).setOrigin(0.5).setTint(0xff0000);
            answer2 = this.add.bitmapText(game.config.width * 1.5, 4 * game.config.height/5, 'gem', this.question.result, 32).setOrigin(0.5).setTint(0xff0000);
        }
        this.wall1 = new Obstacle(this, game.config.width * 2, game.config.height / 3, 'horizontal_bar').setOrigin(0.5, 0);
        this.wall2 = new Obstacle(this, game.config.width * 2, 2 * game.config.height / 3, 'horizontal_bar').setOrigin(0.5, 0);
        this.physics.add.collider(this.player1, [this.wall1, this.wall2]);

        //question tween
        this.tweens.add({
            targets: [text],
            duration: 4500,
            x: { from: game.config.width, to: 0 },
            alpha: { from: 0.9, to: 0.9 },
            onComplete: function() {
                text.destroy();
            }
        });

        //answer tween
        this.tweens.add({
            targets: [answer0, answer1, answer2],
            duration: 7000,
            x: { from: game.config.width * 1.5, to: 0 },
            alpha: { from: 0.9, to: 0.9 },
            onComplete: function() {
                answer0.destroy();
                answer1.destroy();
                answer2.destroy();
            }
        });

        // sets up a timer that when it is passed, the player completed the question
        this.time.delayedCall(7500, () => {
            highScore++;
            promptShowing = false;
        });
    }
}