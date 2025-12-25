export default class MobileControls {
  constructor(scene) {
    this.scene = scene;

    this.left = false;
    this.right = false;
    this.jump = false;

    this.leftPointers = new Set();
    this.rightPointers = new Set();
    this.jumpPointers = new Set();

    this.scene.input.addPointer(3);
    this.scene.input.setPollAlways();

    this.createZones();
    this.bindInput();
  }

  createZones() {
    const w = this.scene.scale.width;
    const h = this.scene.scale.height;

    this.zones = {
      left:  new Phaser.Geom.Rectangle(0, h - 200, w * 0.3, 200),
      right: new Phaser.Geom.Rectangle(w * 0.3, h - 200, w * 0.3, 200),
      jump:  new Phaser.Geom.Rectangle(w * 0.6, h - 200, w * 0.4, 200),
    };

    this.drawZone(this.zones.left,  0xff0000);
    this.drawZone(this.zones.right, 0x00ff00);
    this.drawZone(this.zones.jump,  0x0000ff);
  }

  drawZone(rect, color) {
    const g = this.scene.add.graphics();
    g.fillStyle(color, 0.15);
    g.fillRect(rect.x, rect.y, rect.width, rect.height);
    g.setScrollFactor(0);
  }

  bindInput() {
    this.scene.input.on('pointerdown', this.onDown, this);
    this.scene.input.on('pointerup', this.onUp, this);
    this.scene.input.on('pointerout', this.onUp, this);
  }

  onDown(pointer) {
    const { x, y, id } = pointer;

    if (Phaser.Geom.Rectangle.Contains(this.zones.left, x, y)) {
      this.leftPointers.add(id);
    }

    if (Phaser.Geom.Rectangle.Contains(this.zones.right, x, y)) {
      this.rightPointers.add(id);
    }

    if (Phaser.Geom.Rectangle.Contains(this.zones.jump, x, y)) {
      this.jumpPointers.add(id);
    }

    this.updateState();
  }

  onUp(pointer) {
    const id = pointer.id;

    this.leftPointers.delete(id);
    this.rightPointers.delete(id);
    this.jumpPointers.delete(id);

    this.updateState();
  }

  updateState() {
    this.left  = this.leftPointers.size > 0;
    this.right = this.rightPointers.size > 0;
    this.jump  = this.jumpPointers.size > 0;
  }
}
