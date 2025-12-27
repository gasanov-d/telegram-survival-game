import Enemy from "../entities/Enemy.js";

export default class EnemySpawner {
  constructor(scene, player) {
    this.scene = scene;
    this.player = player;
    this.enemies = [];

    scene.time.addEvent({
      delay: 2000,
      loop: true,
      callback: () => this.spawn()
    });
  }

  spawn() {
    const x = Phaser.Math.Between(0, this.scene.scale.width);
    const y = Phaser.Math.Between(0, this.scene.scale.height);

    const enemy = new Enemy(this.scene, x, y, this.player);
    this.enemies.push(enemy);
  }

  update() {
    this.enemies = this.enemies.filter(e => e.gameObject.active);
    this.enemies.forEach(e => e.update());
  }
}
