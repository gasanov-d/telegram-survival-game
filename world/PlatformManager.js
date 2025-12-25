export default class PlatformManager {
  constructor(scene) {
    this.scene = scene;
    this.platforms = scene.physics.add.staticGroup();
    this.lastX = 0;
    this.createInitialPlatforms();
  }

  createInitialPlatforms() {
    for (let i = 0; i < 6; i++) {
      this.spawnPlatform();
    }
  }

  spawnPlatform() {
    const width = Phaser.Math.Between(200, 350);
    const height = 30;

    const x = this.lastX + Phaser.Math.Between(200, 300);
    const y = Phaser.Math.Between(
      this.scene.scale.height - 200,
      this.scene.scale.height - 80
    );

    const platform = this.platforms.create(x, y);
    platform.setDisplaySize(width, height).refreshBody();

    this.lastX = x;
  }

  update() {
    const camRight =
      this.scene.cameras.main.scrollX + this.scene.scale.width;

    if (camRight > this.lastX - 300) {
      this.spawnPlatform();
    }

    this.platforms.children.iterate(p => {
      if (
        p &&
        p.x < this.scene.cameras.main.scrollX - 400
      ) {
        p.destroy();
      }
    });
  }
}
