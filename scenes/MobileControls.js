export default class MobileControls {
  constructor(scene) {
    this.scene = scene;

    this.left = false;
    this.right = false;
    this.jump = false;

    // ВКЛЮЧАЕМ MULTITOUCH (КЛЮЧЕВО!)
    this.scene.input.addPointer(3);

    this.createButtons();
  }

  createButtons() {
    const w = this.scene.scale.width;
    const h = this.scene.scale.height;

    const size = 130;
    const alphaIdle = 0.15;
    const alphaActive = 0.8;

    // LEFT
    const leftBtn = this.scene.add.rectangle(
      100,
      h - 140,
      size,
      size,
      0x000000,
      alphaIdle
    )
    .setScrollFactor(0)
    .setInteractive({ useHandCursor: false });

    // RIGHT
    const rightBtn = this.scene.add.rectangle(
      260,
      h - 140,
      size,
      size,
      0x000000,
      alphaIdle
    )
    .setScrollFactor(0)
    .setInteractive({ useHandCursor: false });

    // JUMP
    const jumpBtn = this.scene.add.rectangle(
      w - 140,
      h - 140,
      size,
      size,
      0x000000,
      alphaIdle
    )
    .setScrollFactor(0)
    .setInteractive({ useHandCursor: false });

    // === MULTITOUCH EVENTS ===

    leftBtn.on('pointerdown', () => {
      this.left = true;
      leftBtn.setAlpha(alphaActive);
    });

    leftBtn.on('pointerup', () => {
      this.left = false;
      leftBtn.setAlpha(alphaIdle);
    });

    leftBtn.on('pointerout', () => {
      this.left = false;
      leftBtn.setAlpha(alphaIdle);
    });

    rightBtn.on('pointerdown', () => {
      this.right = true;
      rightBtn.setAlpha(alphaActive);
    });

    rightBtn.on('pointerup', () => {
      this.right = false;
      rightBtn.setAlpha(alphaIdle);
    });

    rightBtn.on('pointerout', () => {
      this.right = false;
      rightBtn.setAlpha(alphaIdle);
    });

    jumpBtn.on('pointerdown', () => {
      this.jump = true;
      jumpBtn.setAlpha(alphaActive);
    });

    jumpBtn.on('pointerup', () => {
      this.jump = false;
      jumpBtn.setAlpha(alphaIdle);
    });

    jumpBtn.on('pointerout', () => {
      this.jump = false;
      jumpBtn.setAlpha(alphaIdle);
    });
  }
}
