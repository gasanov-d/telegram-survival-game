import MobileControls from './MobileControls.js';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  create() {
    const w = this.scale.width;
    const h = this.scale.height;

    // фон
    this.cameras.main.setBackgroundColor('#6fa8dc');

    // платформы
    this.platforms = this.physics.add.staticGroup();

    this.platforms.create(w / 2, h - 20)
      .setDisplaySize(w, 40)
      .refreshBody();

    this.platforms.create(w / 2 - 150, h - 150)
      .setDisplaySize(250, 30)
      .refreshBody();

    this.platforms.create(w / 2 + 200, h - 300)
      .setDisplaySize(250, 30)
      .refreshBody();

    // игрок
    this.player = this.add.rectangle(100, h - 200, 40, 40, 0xffcc00);
    this.physics.add.existing(this.player);

    this.player.body.setCollideWorldBounds(true);
    this.player.body.setBounce(0.1);

    this.physics.add.collider(this.player, this.platforms);

    // управление
    this.controls = new MobileControls(this);
  }

  update() {
    const body = this.player.body;

    // горизонтальное движение
    if (this.controls.left) {
      body.setVelocityX(-250);
    } else if (this.controls.right) {
      body.setVelocityX(250);
    } else {
      body.setVelocityX(0);
    }

    // прыжок
    if (this.controls.jump && body.blocked.down) {
      body.setVelocityY(-500);
    }
  }
}
