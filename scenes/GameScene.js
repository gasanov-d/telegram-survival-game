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

    this.collisionSystem = new CollisionSystem(
      this,
      this.player,
      this.enemySpawner.enemies
    );

    this.bullets = [];

    this.lastShot = 0;
    this.fireRate = 250; // мс

    this.cameras.main.startFollow(this.player.gameObject);
  }

  update(time) {
    this.player.update(this.inputSystem);
    this.enemySpawner.update();

    if (this.shootButton.pressed() && time > this.lastShot + this.fireRate) {
      this.shoot();
      this.lastShot = time;
    }

    // столкновения пуль и врагов
    this.bullets = this.bullets.filter(b => b.gameObject.active);
    this.enemySpawner.enemies.forEach(enemy => {
      this.bullets.forEach(bullet => {
        this.physics.overlap(
          bullet.gameObject,
          enemy.gameObject,
          () => {
            enemy.takeDamage(10);
            bullet.gameObject.destroy();
          }
        );
      });
    });
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

    this.bullets.push(bullet);
  }
}
