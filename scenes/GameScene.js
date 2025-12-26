import MobileControls from './MobileControls.js';
import PlatformManager from '../world/PlatformManager.js';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  create() {
    const h = this.scale.height;

    this.cameras.main.setBackgroundColor('#6fa8dc');
    this.physics.world.setBounds(0, 0, 100000, h);

    // игрок
    this.player = this.add.rectangle(100, h - 200, 40, 40, 0xff0000);
    this.physics.add.existing(this.player);
    this.player.body.setGravityY(900);

    // управление
    this.controls = new MobileControls(this);

    // платформы
    this.platformManager = new PlatformManager(this);
    this.physics.add.collider(this.player, this.platformManager.platforms);

    // камера
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setDeadzone(120, 150);

    // скорость
    this.baseSpeed = 180;
    this.currentSpeed = this.baseSpeed;

    // очки
    this.startX = this.player.x;
    this.scoreText = this.add.text(16, 16, '0', {
      fontSize: '28px',
      color: '#fff'
    }).setScrollFactor(0);
 this.scene.launch('UIScene');
 }

  update() {
    const body = this.player.body;

    // ОБЯЗАТЕЛЬНО
    this.controls.update();

    // движение
    if (this.controls.left) {
      this.currentSpeed = Math.max(80, this.currentSpeed - 6);
    } else if (this.controls.right) {
      this.currentSpeed += 6;
    }

    body.setVelocityX(this.currentSpeed);

    // прыжок
    if (this.controls.jump && body.blocked.down) {
      body.setVelocityY(-520);
    }

    this.platformManager.update();

    this.scoreText.setText(
      Math.floor(this.player.x - this.startX)
    );
  }
}
