export default class MobileControls {
  constructor(scene) {
    this.scene = scene;

    this.left = false;
    this.right = false;
    this.jump = false;

    this.createButtons();
  }

  createButtons() {
    const w = this.scene.scale.width;
    const h = this.scene.scale.height;

    const size = 90;
    const alphaIdle = 0.25;
    const alphaActive = 0.6;

    // ===== ЛЕВАЯ КНОПКА =====
    this.leftBtn = this.scene.add.rectangle(
      80,
      h - 100,
      size,
      size,
      0x000000,
      alphaIdle
    )
      .setScrollFactor(0)
      .setDepth(1000)
      .setInteractive();

    // ===== ПРАВАЯ КНОПКА =====
    this.rightBtn = this.scene.add.rectangle(
      200,
      h - 100,
      size,
      size,
      0x000000,
      alphaIdle
    )
      .setScrollFactor(0)
      .setDepth(1000)
      .setInteractive();

    // ===== ПРЫЖОК =====
    this.jumpBtn = this.scene.add.rectangle(
      w - 100,
      h - 100,
      size,
      size,
      0x000000,
      alphaIdle
    )
      .setScrollFactor(0)
      .setDepth(1000)
      .setInteractive();

    // ===== СОБЫТИЯ =====

    this.leftBtn.on('pointerdown', () => {
      this.left = true;
      this.leftBtn.setAlpha(alphaActive);
    });

    this.leftBtn.on('pointerup', () => {
      this.left = false;
      this.leftBtn.setAlpha(alphaIdle);
    });

    this.leftBtn.on('pointerout', () => {
      this.left = false;
      this.leftBtn.setAlpha(alphaIdle);
    });

    this.rightBtn.on('pointerdown', () => {
      this.right = true;
      this.rightBtn.setAlpha(alphaActive);
    });

    this.rightBtn.on('pointerup', () => {
      this.right = false;
      this.rightBtn.setAlpha(alphaIdle);
    });

    this.rightBtn.on('pointerout', () => {
      this.right = false;
      this.rightBtn.setAlpha(alphaIdle);
    });

    this.jumpBtn.on('pointerdown', () => {
      this.jump = true;
      this.jumpBtn.setAlpha(alphaActive);
    });

    this.jumpBtn.on('pointerup', () => {
      this.jump = false;
      this.jumpBtn.setAlpha(alphaIdle);
    });

    this.jumpBtn.on('pointerout', () => {
      this.jump = false;
      this.jumpBtn.setAlpha(alphaIdle);
    });
  }
}
