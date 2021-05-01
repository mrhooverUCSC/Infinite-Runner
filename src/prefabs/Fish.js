// 
// 
class Fish extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        this.moveSpeed = 5;
    }

    update() {
        // moving left
        if(keyLEFT.isDown && this.x >= this.width - borderUISize - borderPadding) {
            this.x -= this.moveSpeed;
        }
        // moving right
        if(keyRIGHT.isDown && this.x <= game.config.width - this.width + borderUISize + borderPadding) {
            this.x += this.moveSpeed;
        }
        // moving up
        if(keyUP.isDown && this.y >= this.height - borderUISize - borderPadding * 2) {
            this.y -= this.moveSpeed;
        }
        // moving down
        if(keyDOWN.isDown && this.y <= game.config.height - this.height) {
            this.y += this.moveSpeed;
        }
    }
}