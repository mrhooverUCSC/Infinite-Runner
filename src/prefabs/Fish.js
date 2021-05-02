// 
// 
class Fish extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.onCollide = true;
        this.moveSpeed = 150;
        this.setCollideWorldBounds(true);
    }

    update() {
        // moving left
        if(keyLEFT.isDown && this.x >= this.width - borderUISize - borderPadding) {
            this.setVelocityX(-this.moveSpeed);
            this.setVelocityY(0);
        }
        // moving right
        else if(keyRIGHT.isDown && this.x <= game.config.width - this.width + borderUISize + borderPadding) {
            this.setVelocityX(this.moveSpeed);
            this.setVelocityY(0);
        }
        // moving up
        else if(keyUP.isDown && this.y >= this.height - borderUISize - borderPadding * 2) {
            this.setVelocityY(-this.moveSpeed);
            this.setVelocityX(0);
        }
        // moving down
        else if(keyDOWN.isDown && this.y <= game.config.height - this.height) {
            this.setVelocityY(this.moveSpeed);
            this.setVelocityX(0);
        }
        else {
            this.setVelocityX(0);
            this.setVelocityY(0);
        }
    }
}