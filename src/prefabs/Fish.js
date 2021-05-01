// 
// 
class Fish extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        this.moveSpeed = 5;
    }

    update() {
        if(keyLEFT.isDown && this.x >= this.width - borderUISize - borderPadding) {
            this.x -= this.moveSpeed;
        }
        if(keyRIGHT.isDown && this.x <= game.config.width - this.width) {
            this.x += this.moveSpeed;
        }
        if(keyUP.isDown && this.y >= this.height - borderUISize - borderPadding * 2) {
            this.y -= this.moveSpeed;
        }
        if(keyDOWN.isDown && this.y <= game.config.height - this.height) {
            this.y += this.moveSpeed;
        }
    }
}