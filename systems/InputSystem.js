export default class InputSystem {
  constructor(scene) {
    this.direction = { x: 0, y: 0 };

    scene.input.on("pointermove", pointer => {
      const cx = scene.scale.width / 2;
      const cy = scene.scale.height / 2;

      const dx = pointer.x - cx;
      const dy = pointer.y - cy;
      const len = Math.hypot(dx, dy);

      if (len > 20) {
        this.direction.x = dx / len;
        this.direction.y = dy / len;
      } else {
        this.direction.x = 0;
        this.direction.y = 0;
      }
    });

    scene.input.on("pointerup", () => {
      this.direction.x = 0;
      this.direction.y = 0;
    });
  }

  update() {}

  getDirection() {
    return this.direction;
  }
}
