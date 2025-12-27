import Player from "../entities/Player.js";
import InputSystem from "../systems/InputSystem.js";
import EnemySpawner from "../systems/EnemySpawner.js";
import CollisionSystem from "../systems/CollisionSystem.js";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  create() {
    this.inputSystem = new InputSystem(this);

    this.player = new Player(this, 400, 300);

    this.enemySpawner = new EnemySpawner(this, this.player);

    this.collisionSystem = new CollisionSystem(
      this,
      this.player,
      this.enemySpawner.enemies
    );

    this.cameras.main.startFollow(this.player.gameObject);
  }

  update() {
    this.inputSystem.update();
    this.player.update(this.inputSystem);
    this.enemySpawner.update();
  }
}
