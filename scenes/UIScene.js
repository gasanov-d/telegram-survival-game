import HUD from "../ui/HUD.js";

export default class UIScene extends Phaser.Scene {
  constructor() {
    super("UIScene");
  }

  create() {
    this.hud = new HUD(this);

    const gameScene = this.scene.get("GameScene");

    gameScene.events.on("player-hp", (hp) => {
      this.hud.update(hp);
    });
  }
}
