import Player from "../entities/Player.js";
import InputSystem from "../systems/InputSystem.js";
import EnemySpawner from "../systems/EnemySpawner.js";
import CollisionSystem from "../systems/CollisionSystem.js";
import ShootButton from "../systems/ShootButton.js";
import Bullet from "../entities/Bullet.js";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  create() {
    const w = this.scale.width;
    const h = this.scale.height;

    this.add.rectangle(w / 2, h / 2, w, h, 0x222222);
    this.physics.world.setBounds(0, 0, w, h);

    this.inputSystem = new InputSystem(this);
    this.shootButton = new ShootButton(this);

    this.player = new Player(this, w / 2, h / 2);
    this.enemySpawner = new EnemySpawner(this, this.player);

    // 🔥 ГРУППА ПУЛЬ
    this.bullets = this.physics.add.group();

    // 🔥 ОДИН overlap
    this.physics.add.overlap(
      this.bullets,
      () => this.enemySpawner.enemies.map(e => e.gameObject),
      (bullet, enemyGO) => {
        bullet.destroy();
        const enemy = this.enemySpawner.enemies.find(
          e => e.gameObject === enemyGO
        );
        if (enemy) enemy.takeDamage(10);
      }
    );

    this.collisionSystem = new CollisionSystem(
      this,
      this.player,
      this.enemySpawner.enemies
    );

    this.lastShot = 0;
    this.fireRate = 250;

    this.cameras.main.startFollow(this.player.gameObject);
  }

  update(time) {
    this.player.update(this.inputSystem);
    this.enemySpawner.update();

    if (this.shootButton.pressed() && time > this.lastShot + this.fireRate) {
      this.shoot();
      this.lastShot = time;
    }
  }

  shoot() {
    const dir = this.inputSystem.getDirection();
    if (dir.x === 0 && dir.y === 0) return;

    const bullet = new Bullet(
      this,
      this.player.x,
      this.player.y,
      dir.x,
      dir.y
    );

    this.bullets.add(bullet.gameObject);
  }
}
