export default class BootScene extends Phaser.Scene {
  constructor() {
    super("BootScene");
  }

  preload() {
    // ассеты будут добавлены позже
  }

  create() {
    this.scene.start("GameScene");
    this.scene.launch("UIScene");
  }
}
