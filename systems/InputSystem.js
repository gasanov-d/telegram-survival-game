export default class InputSystem {
  constructor(scene) {
    this.scene = scene;
    this.direction = { x: 0, y: 0 };

    this.baseRadius = 60;
    this.stickRadius = 30;

    this.active = false;
    this.pointerId = null;

    // БАЗА ДЖОЙСТИКА
    this.base = scene.add.circle(0, 0, this.baseRadius, 0x444444, 0.4)
      .setScrollFactor(0)
      .setDepth(100)
      .setVisible(false);

    // СТИК
    this.stick = scene.add.circle(0, 0, this.stickRadius, 0xaaaaaa, 0.7)
      .setScrollFactor(0)
      .setDepth(101)
      .setVisible(false);

    scene.input.on("pointerdown", this.onDown, this);
    scene.input.on("pointermove", this.onMove, this);
    scene.input.on("pointerup", this.onUp, this);
  }

  onDown(pointer) {
    // только левая половина экрана
    if (pointer.x > this.scene.scale.width / 2) return;

    this.active = true;
    this.pointerId = pointer.id;

    this.base.setPosition(pointer.x, pointer.y).setVisible(true);
    this.stick.setPosition(pointer.x, pointer.y).setVisible(true);
  }

  onMove(pointer) {
    if (!this.active || pointer.id !== this.pointerId) return;

    const dx = pointer.x - this.base.x;
    const dy = pointer.y - this.base.y;
    const len = Math.hypot(dx, dy);

    if (len === 0) return;

    const clamped = Math.min(len, this.baseRadius);
    const nx = dx / len;
    const ny = dy / len;

    this.stick.setPosition(
      this.base.x + nx * clamped,
      this.base.y + ny * clamped
    );

    this.direction.x = nx;
    this.direction.y = ny;
  }

  onUp(pointer) {
    if (pointer.id !== this.pointerId) return;

    this.active = false;
    this.pointerId = null;

    this.direction.x = 0;
    this.direction.y = 0;

    this.base.setVisible(false);
    this.stick.setVisible(false);
  }

  update() {}

  getDirection() {
    return this.direction;
  }
}
