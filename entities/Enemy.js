export default class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, target) {
    super(scene, x, y, null);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setDisplaySize(30, 30);
    this.setTint(0xff0000);

    this.speed = 100;
    this.target = target;
  }

  update() {
    if (!this.target || !this.target.active) return;

    const dx = this.target.x - this.x;
    const dy = this.target.y - this.y;
    const len = Math.hypot(dx, dy);

    if (len === 0) return;

    this.body.setVelocity(
      (dx / len) * this.speed,
      (dy / len) * this.speed
    );
  }
}
