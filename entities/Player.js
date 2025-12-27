export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, null);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setDisplaySize(40, 40);
    this.setTint(0x00ff00);

    this.speed = 200;
    this.hp = 100;
  }

  update(inputSystem) {
    const dir = inputSystem.getDirection();

    this.body.setVelocity(
      dir.x * this.speed,
      dir.y * this.speed
    );
  }

  takeDamage(amount) {
    this.hp -= amount;
    this.scene.events.emit("player-hp", this.hp);

    if (this.hp <= 0) {
      this.destroy();
    }
  }
}
