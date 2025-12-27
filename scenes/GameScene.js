import Player from "../entities/Player.js";
import InputSystem from "../systems/InputSystem.js";
import EnemySpawner from "../systems/EnemySpawner.js";
import CollisionSystem from "../systems/CollisionSystem.js";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  create() {
    const w = this.scale.width;
    const h = this.scale.height;

    // ЯВНЫЙ ФОН (чтобы видеть сцену)
    this.add.rectangle(w / 2, h / 2, w, h, 0x222222);

    // ГРАНИЦЫ МИРА
    this.physics.world.setBounds(0, 0, w, h);

    this.inputSystem = new InputSystem(this);

    this.player = new Player(this, w / 2, h / 2);

    this.enemySpawner = new EnemySpawner(this, this.player);

    this.collisionSystem = new CollisionSystem(
      this,
      this.player,
      this.enemySpawner.enemies
    );

    this.cameras.main.startFollow(this.player.gameObject);
    this.cameras.main.setBounds(0, 0, w, h);
  }

  update() {
    this.inputSystem.update();
    this.player.update(this.inputSystem);
    this.enemySpawner.update();
  }
}
