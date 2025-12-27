export default class ShootButton {
  constructor(scene) {
    this.scene = scene;
    this.active = false;

    const r = 60;
    const x = scene.scale.width - r - 20;
    const y = scene.scale.height - r - 20;

    this.bg = scene.add.circle(x, y, r, 0xff0000, 0.4)
      .setScrollFactor(0)
      .setInteractive();

    this.bg.on("pointerdown", () => {
      this.active = true;
    });

    this.bg.on("pointerup", () => {
      this.active = false;
    });

    this.bg.on("pointerout", () => {
      this.active = false;
    });
  }

  pressed() {
    return this.active;
  }
}
