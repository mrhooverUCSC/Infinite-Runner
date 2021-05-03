class Obstacle extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.onCollide = true;
        this.body.setImmovable(true);
        this.setVelocityX(-250);

        this.newEnemy = true;
    }

    update() {
        // recursively creates a new enemy onces one leaves the boundaries
        if(this.newEnemy && this.x < game.config.width / 2) {
            this.newEnemy = false;
            this.scene.addEnemy();
        }

        if(this.x < -this.width) {
            this.destroy();
        }
    }
}