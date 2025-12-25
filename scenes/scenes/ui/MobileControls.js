class MobileControls {
  constructor(scene) {
    this.scene = scene;
    this.left = false;
    this.right = false;
    this.jump = false;

    const h = scene.scale.height;
    const w = scene.scale.width;

    this.leftBtn = scene.add.rectangle(80, h - 80, 120, 120, 0x000000, 0.4).setInteractive();
    this.rightBtn = scene.add.rectangle(240, h - 80, 120, 120, 0x000000, 0.4).setInteractive();
    this.jumpBtn = scene.add.rectangle(w - 100, h - 100, 140, 140, 0x000000, 0.4).setInteractive();

    this.leftBtn.on('pointerdown', () => this.left = true);
    this.leftBtn.on('pointerup', () => this.left = false);

    this.rightBtn.on('pointerdown', () => this.right = true);
    this.rightBtn.on('pointerup', () => this.right = false);

    this.jumpBtn.on('pointerdown', () => this.jump = true);
    this.jumpBtn.on('pointerup', () => this.jump = false);
  }
}
