export default class Enemy {
  constructor(scene, x, y, target) {
    this.scene = scene;
    this.target = target;

    this.gameObject = scene.add.rectangle(x, y, 30, 30, 0xff0000);
    scene.physics.add.existing(this.gameObject);

    this.body = this.gameObject.body;
    this.speed = 100;
    this.hp = 30;
  }

  update() {
    if (!this.target.active) return;

    const dx = this.target.x - this.gameObject.x;
    const dy = this.target.y - this.gameObject.y;
    const len = Math.hypot(dx, dy);
    if (!len) return;

    this.body.setVelocity(
      (dx / len) * this.speed,
      (dy / len) * this.speed
    );
  }

  takeDamage(dmg) {
    this.hp -= dmg;
    if (this.hp <= 0) {
      this.gameObject.destroy();
    }
  }
}
