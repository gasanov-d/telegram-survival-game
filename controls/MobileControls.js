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

    this.leftBtn = this.scene.add
      .rectangle(80, h - 80, 120, 120, 0x000000, 0.35)
      .setScrollFactor(0)
      .setInteractive();

    this.rightBtn = this.scene.add
      .rectangle(240, h - 80, 120, 120, 0x000000, 0.35)
      .setScrollFactor(0)
      .setInteractive();

    this.jumpBtn = this.scene.add
      .rectangle(w - 100, h - 80, 140, 140, 0x000000, 0.35)
      .setScrollFactor(0)
      .setInteractive();

    this.bind(this.leftBtn, 'left');
    this.bind(this.rightBtn, 'right');
    this.bind(this.jumpBtn, 'jump');
  }

  bind(btn, key) {
    btn.on('pointerdown', () => (this[key] = true));
    btn.on('pointerup', () => (this[key] = false));
    btn.on('pointerout', () => (this[key] = false));
  }

  update() {}
}
