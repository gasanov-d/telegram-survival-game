import MobileControls from '../controls/MobileControls.js';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  create() {
    const w = this.scale.width;
    const h = this.scale.height;

    // фон
    this.cameras.main.setBackgroundColor('#6fa8dc');

    // границы мира
    this.physics.world.setBounds(0, 0, 10000, h);

    // платформа (земля)
    this.platforms = this.physics.add.staticGroup();
    this.platforms
      .create(5000, h - 20)
      .setDisplaySize(10000, 40)
      .refreshBody();

    // игрок
    this.player = this.add.rectangle(100, h - 100, 40, 40, 0xff0000);
    this.physics.add.existing(this.player);

    this.player.body.setCollideWorldBounds(false);
    this.player.body.setGravityY(900);

    // столкновение
    this.physics.add.collider(this.player, this.platforms);

    // камера
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setDeadzone(120, 150);

    // управление
    this.controls = new MobileControls(this);

    // скорость
    this.speed = 180;
  }

  update() {
    const body = this.player.body;

    // движение
    if (this.controls.left) {
      body.setVelocityX(-this.speed);
    } else if (this.controls.right) {
      body.setVelocityX(this.speed);
    } else {
      body.setVelocityX(0);
    }

    // прыжок
    if (this.controls.jump && body.blocked.down) {
      body.setVelocityY(-520);
    }

    // смерть при падении
    if (this.player.y > this.scale.height + 300) {
      this.scene.restart();
    }
  }
}
