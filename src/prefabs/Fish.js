class Fish extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.onCollide = true;
        this.moveSpeed = 250;
        this.setCollideWorldBounds(true); //collide with the sides of the canvas
    }

    update() {
        // moving left
        if(keyLEFT.isDown) {
            this.setVelocityX(-this.moveSpeed);
        }
        // moving right
        else if(keyRIGHT.isDown) {
            this.setVelocityX(this.moveSpeed);
        }
        else {
            this.setVelocityX(0);
        }
        // moving up
        if(keyUP.isDown) {
            this.setVelocityY(-this.moveSpeed);
        }
        // moving down
        else if(keyDOWN.isDown) {
            this.setVelocityY(this.moveSpeed);
        }
        else {
            this.setVelocityY(0);
        }
    }
}