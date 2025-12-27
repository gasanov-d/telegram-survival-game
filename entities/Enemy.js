export default class Enemy {
  constructor(scene, x, y, player) {
    this.scene = scene;
    this.player = player;

    this.hp = 30;

    this.gameObject = scene.add.rectangle(x, y, 30, 30, 0xff0000);
    scene.physics.add.existing(this.gameObject);

    this.body = this.gameObject.body;
    this.body.setCollideWorldBounds(true);
    this.body.setVelocity(0);
  }

  update() {
    const dx = this.player.x - this.gameObject.x;
    const dy = this.player.y - this.gameObject.y;
    const len = Math.hypot(dx, dy) || 1;

    this.body.setVelocity(
      (dx / len) * 80,
      (dy / len) * 80
    );
  }

  takeDamage(amount) {
    this.hp -= amount;

    if (this.hp <= 0) {
      this.gameObject.destroy();
      this.dead = true;
    }
  }
}
