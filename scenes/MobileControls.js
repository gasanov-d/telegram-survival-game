export default class MobileControls {
  constructor(scene) {
    this.scene = scene;
    this.left = false;
    this.right = false;
    this.jump = false;

    this.createButtons();
  }

  createButtons() {
    const h = this.scene.scale.height;

    const leftBtn = this.scene.add.rectangle(80, h - 80, 120, 120, 0x000000, 0.3)
      .setScrollFactor(0)
      .setInteractive();

    const rightBtn = this.scene.add.rectangle(220, h - 80, 120, 120, 0x000000, 0.3)
      .setScrollFactor(0)
      .setInteractive();

    const jumpBtn = this.scene.add.rectangle(this.scene.scale.width - 100, h - 100, 140, 140, 0x000000, 0.3)
      .setScrollFactor(0)
      .setInteractive();

    leftBtn.on('pointerdown', () => this.left = true);
    leftBtn.on('pointerup', () => this.left = false);
    leftBtn.on('pointerout', () => this.left = false);

    rightBtn.on('pointerdown', () => this.right = true);
    rightBtn.on('pointerup', () => this.right = false);
    rightBtn.on('pointerout', () => this.right = false);

    jumpBtn.on('pointerdown', () => this.jump = true);
    jumpBtn.on('pointerup', () => this.jump = false);
  }
}
