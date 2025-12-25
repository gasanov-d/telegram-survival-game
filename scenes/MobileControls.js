export default class MobileControls {
  constructor(scene) {
    this.scene = scene;

    this.left = false;
    this.right = false;
    this.jump = false;

    scene.input.addPointer(3);

    this.createButtons();
    this.bindEvents();
  }

  createButtons() {
    const w = this.scene.scale.width;
    const h = this.scene.scale.height;

    this.buttons = {
      left: this.createButton(60, h - 80, '◀'),
      right: this.createButton(160, h - 80, '▶'),
      jump: this.createButton(w - 80, h - 80, '▲')
    };
  }

  createButton(x, y, text) {
    const btn = this.scene.add.text(x, y, text, {
      fontSize: '48px',
      fontFamily: 'Arial',
      color: '#ffffff',
      backgroundColor: '#000000'
    });

    btn.setPadding(10);
    btn.setScrollFactor(0);
    btn.setDepth(1000);
    btn.setInteractive({ useHandCursor: true });

    return btn;
  }

  bindEvents() {
    this.buttons.left.on('pointerdown', () => this.left = true);
    this.buttons.left.on('pointerup', () => this.left = false);
    this.buttons.left.on('pointerout', () => this.left = false);

    this.buttons.right.on('pointerdown', () => this.right = true);
    this.buttons.right.on('pointerup', () => this.right = false);
    this.buttons.right.on('pointerout', () => this.right = false);

    this.buttons.jump.on('pointerdown', () => this.jump = true);
    this.buttons.jump.on('pointerup', () => this.jump = false);
    this.buttons.jump.on('pointerout', () => this.jump = false);
  }
}
