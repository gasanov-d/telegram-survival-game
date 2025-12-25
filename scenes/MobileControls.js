export default class MobileControls {
  constructor(scene) {
    this.scene = scene;

    this.left = false;
    this.right = false;
    this.jump = false;

    // клавиатура (резерв, чтобы ТЫ ТОЧНО МОГ ПРЫГАТЬ)
    this.keys = scene.input.keyboard.addKeys({
      left: 'A',
      right: 'D',
      jump: 'SPACE'
    });

    scene.input.addPointer(3);

    this.createZones();
    this.bindPointers();

    console.log('MobileControls LOADED');
  }

  createZones() {
    const w = this.scene.scale.width;
    const h = this.scene.scale.height;

    // зоны касания
    this.zones = {
      left: this.scene.add.zone(0, h - 200, w * 0.33, 200)
        .setOrigin(0)
        .setScrollFactor(0)
        .setInteractive(),

      right: this.scene.add.zone(w * 0.33, h - 200, w * 0.33, 200)
        .setOrigin(0)
        .setScrollFactor(0)
        .setInteractive(),

      jump: this.scene.add.zone(w * 0.66, h - 200, w * 0.34, 200)
        .setOrigin(0)
        .setScrollFactor(0)
        .setInteractive()
    };

    // ВИЗУАЛ (чтобы ты ИХ ВИДЕЛ)
    this.drawDebug(this.zones.left, 0xff0000);
    this.drawDebug(this.zones.right, 0x00ff00);
    this.drawDebug(this.zones.jump, 0x0000ff);
  }

  drawDebug(zone, color) {
    const g = this.scene.add.graphics();
    g.fillStyle(color, 0.25);
    g.fillRect(
      zone.x,
      zone.y,
      zone.input.hitArea.width,
      zone.input.hitArea.height
    );
    g.setScrollFactor(0);
    g.setDepth(9999);
  }

  bindPointers() {
    this.zones.left.on('pointerdown', () => this.left = true);
    this.zones.left.on('pointerup', () => this.left = false);
    this.zones.left.on('pointerout', () => this.left = false);

    this.zones.right.on('pointerdown', () => this.right = true);
    this.zones.right.on('pointerup', () => this.right = false);
    this.zones.right.on('pointerout', () => this.right = false);

    this.zones.jump.on('pointerdown', () => this.jump = true);
    this.zones.jump.on('pointerup', () => this.jump = false);
    this.zones.jump.on('pointerout', () => this.jump = false);
  }

  update() {
    // клавиатура как fallback
    this.left = this.left || this.keys.left.isDown;
    this.right = this.right || this.keys.right.isDown;
    this.jump = this.jump || this.keys.jump.isDown;
  }
}
