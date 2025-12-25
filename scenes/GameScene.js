import MobileControls from './MobileControls.js';
import PlatformManager from '../world/PlatformManager.js';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  create() {
    const w = this.scale.width;
    const h = this.scale.height;

    // фон
    this.cameras.main.setBackgroundColor('#6fa8dc');

    // границы мира (очень широкие)
    this.physics.world.setBounds(0, 0, 100000, h);

    // игрок
    this.player = this.add.rectangle(100, h - 200, 40, 40, 0xff0000);
    this.physics.add.existing(this.player);

    this.player.body.setGravityY(900);
    this.player.body.setCollideWorldBounds(false);

    // управление
    this.controls = new MobileControls(this);

    // платформы (БЕСКОНЕЧНЫЕ)
    this.platformManager = new PlatformManager(this);
    this.physics.add.collider(
      this.player,
      this.platformManager.platforms
    );

    // камера
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setDeadzone(120, 150);

    // автодвижение вперёд
    this.player.body.setVelocityX(180);
  }

  update() {
    const body = this.player.body;

    // постоянное движение
    body.setVelocityX(180);

    // прыжок
    if (this.controls.jump && body.blocked.down) {
      body.setVelocityY(-520);
    }

    // обновление платформ
    this.platformManager.update();

    // смерть при падении
    if (this.player.y > this.scale.height + 300) {
      this.scene.restart();
    }
  }
}
