export default class HUD {
  constructor(scene) {
    this.scene = scene;

    this.hpText = scene.add.text(16, 16, "HP: 100", {
      fontSize: "18px",
      fill: "#ffffff"
    });

    this.hpText.setScrollFactor(0);
  }

  update(hp) {
    this.hpText.setText(`HP: ${hp}`);
  }
}
