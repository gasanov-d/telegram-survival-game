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
    const w = this.scene.scale.width;

    // ←
    const leftBtn = this.scene.add.rectangle(70, h - 70, 90, 90, 0x222222)
      .setScrollFactor(0)
      .setInteractive();

    this.scene.add.text(55, h - 85, '◀', {
      fontSize: '48px',
      color: '#ffffff'
    }).setScrollFactor(0);

    // →
    const rightBtn = this.scene.add.rectangle(170, h - 70, 90, 90, 0x222222)
      .setScrollFactor(0)
      .setInteractive();

    this.scene.add.text(155, h - 85, '▶', {
      fontSize: '48px',
      color: '#ffffff'
    }).setScrollFactor(0);

    // ⬆ прыжок
    const jumpBtn = this.scene.add.rectangle(w - 80, h - 80, 110, 110, 0x444444)
      .setScrollFactor(0)
      .setInteractive();

    this.scene.add.text(w - 100, h - 105, '⬆', {
      fontSize: '48px',
      color: '#ffffff'
    }).setScrollFactor(0);

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
