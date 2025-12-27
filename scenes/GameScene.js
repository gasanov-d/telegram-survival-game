import Player from "../entities/Player.js";
import InputSystem from "../systems/InputSystem.js";
import HUD from "../ui/HUD.js";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  create() {
    this.inputSystem = new InputSystem(this);

    this.player = new Player(this, 400, 300);

    this.cameras.main.startFollow(this.player);
    this.cameras.main.setDeadzone(100, 100);

    this.hud = new HUD(this);
  }

  update(time, delta) {
    this.inputSystem.update();
    this.player.update(this.inputSystem);
    this.hud.update(this.player.hp);
  }
}
