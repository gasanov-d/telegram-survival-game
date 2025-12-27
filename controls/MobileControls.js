export default class MobileControls {
  constructor(scene) {
    this.scene = scene;

    this.left = false;
    this.right = false;
    this.jump = false;

    // мультитач (важно для телефона)
    this.scene.input.addPointer(3);
    this.scene.input.setPollAlways();

    this.createZones();
    this.bindInput();
  }

  createZones() {
    const w = this.scene.scale.width;
    const h = this.scene.scale.height;

    this.zones = {
      left: new Phaser.Geom.Rectangle(0, h - 200, w * 0.3, 200),
      right: new Phaser.Geom.Rectangle(w * 0.3, h - 200, w * 0.3, 200),
      jump: new Phaser.Geom.Rectangle(w * 0.6, h - 200, w * 0.4, 200),
    };

    // визуал кнопок (можно потом убрать)
    this.drawZone(this.zones.left, 0xff0000);
    this.drawZone(this.zones.right, 0x00ff00);
    this.drawZone(this.zones.jump, 0x0000ff);
  }

  drawZone(rect, color) {
    const g = this.scene.add.graphics();
    g.fillStyle(color, 0.25);
    g.fillRect(rect.x, rect.y, rect.width, rect.height);
    g.setScrollFactor(0);
  }

  bindInput() {
    this.scene.input.on('pointerdown', this.handleInput, this);
    this.scene.input.on('pointermove', this.handleInput, this);
    this.scene.input.on('pointerup', this.clearInput, this);
  }

  handleInput(pointer) {
    const x = pointer.x;
    const y = pointer.y;

    this.left = Phaser.Geom.Rectangle.Contains(this.zones.left, x, y);
    this.right = Phaser.Geom.Rectangle.Contains(this.zones.right, x, y);
    this.jump = Phaser.Geom.Rectangle.Contains(this.zones.jump, x, y);
  }

  clearInput() {
    this.left = false;
    this.right = false;
    this.jump = false;
  }

  update() {
    // оставлено для будущего расширения
  }
}
