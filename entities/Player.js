export default class Player {
  constructor(scene, x, y) {
    this.scene = scene;

    // визуал игрока
    this.sprite = scene.add.rectangle(x, y, 40, 40, 0xffcc00);

    // физика
    scene.physics.add.existing(this.sprite);
    this.sprite.body.setCollideWorldBounds(true);
    this.sprite.body.setBounce(0.1);

    this.body = this.sprite.body;
  }

  moveLeft(speed = 250) {
    this.body.setVelocityX(-speed);
  }

  moveRight(speed = 250) {
    this.body.setVelocityX(speed);
  }

  stop() {
    this.body.setVelocityX(0);
  }

  jump(force = 500) {
    if (this.body.blocked.down) {
      this.body.setVelocityY(-force);
    }
  }
}
