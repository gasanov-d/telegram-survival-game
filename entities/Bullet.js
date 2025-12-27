export default class Bullet {
  constructor(scene, x, y, dirX, dirY) {
    this.scene = scene;

    this.gameObject = scene.add.rectangle(x, y, 8, 8, 0xffff00);
    scene.physics.add.existing(this.gameObject);

    this.body = this.gameObject.body;
    this.body.setAllowGravity(false);

    const speed = 500;
    this.body.setVelocity(dirX * speed, dirY * speed);

    scene.time.delayedCall(1500, () => {
      if (this.gameObject.active) {
        this.gameObject.destroy();
      }
    });
  }
}
