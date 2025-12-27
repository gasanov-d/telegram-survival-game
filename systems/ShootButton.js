export default class ShootButton {
  constructor(scene) {
    this.scene = scene;
    this.isPressed = false;

    const x = scene.scale.width - 90;
    const y = scene.scale.height - 90;

    this.button = scene.add.circle(x, y, 45, 0xff4444, 0.6)
      .setScrollFactor(0)
      .setDepth(200)
      .setInteractive();

    this.button.on("pointerdown", () => {
      this.isPressed = true;
    });

    this.button.on("pointerup", () => {
      this.isPressed = false;
    });

    this.button.on("pointerout", () => {
      this.isPressed = false;
    });
  }

  pressed() {
    return this.isPressed;
  }
}
