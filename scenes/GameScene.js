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

    // физика мира
    this.physics.world.setBounds(0, 0, 100000, h);

    // платформы
    this.platforms = this.physics.add.staticGroup();

    this.platforms
      .create(400, h - 20)
      .setDisplaySize(800, 40)
      .refreshBody();

    this.platforms
      .create(900, h - 150)
      .setDisplaySize(300, 30)
      .refreshBody();

    this.platforms
      .create(1400, h - 250)
      .setDisplaySize(300, 30)
      .refreshBody();

    // игрок
    this.player = this.add.rectangle(100, h - 200, 40, 40, 0xff0000);
    this.physics.add.existing(this.player);

    this.player.body.setCollideWorldBounds(false);
    this.player.body.setBounce(0);
    this.player.body.setGravityY(900);

    // столкновения
    this.physics.add.collider(this.player, this.platforms);

    // камера
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setDeadzone(100, 150);

    // управление
    this.controls = new MobileControls(this);

    // постоянное движение вперёд (survival)
    this.player.body.setVelocityX(180);
  }

  update() {
    const body = this.player.body;

    // движение вперёд всегда
    body.setVelocityX(180);

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
