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

    // мир
    this.physics.world.setBounds(0, 0, 100000, h);

    // игрок
    this.player = this.add.rectangle(100, h - 200, 40, 40, 0xff0000);
    this.physics.add.existing(this.player);

    this.player.body.setGravityY(900);
    this.player.body.setCollideWorldBounds(false);

    // управление
    this.controls = new MobileControls(this);

    // платформы
    this.platformManager = new PlatformManager(this);
    this.physics.add.collider(
      this.player,
      this.platformManager.platforms
    );

    // камера
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setDeadzone(120, 150);

    // движение
    this.baseSpeed = 180;
    this.maxSpeed = 320;
    this.currentSpeed = this.baseSpeed;

    // ===== ОЧКИ =====
    this.score = 0;
    this.scoreText = this.add.text(16, 16, '0', {
      fontSize: '28px',
      fontFamily: 'Arial',
      color: '#ffffff'
    });
    this.scoreText.setScrollFactor(0);
    this.scoreText.setDepth(1000);
  }

  update(time, delta) {
    const body = this.player.body;

    // === ДВИЖЕНИЕ ===
    if (this.controls.left) {
      this.currentSpeed = Math.max(80, this.currentSpeed - 6);
    } else if (this.controls.right) {
      this.currentSpeed = Math.min(
        this.maxSpeed,
        this.currentSpeed + 6
      );
    } else {
      this.currentSpeed +=
        (this.baseSpeed - this.currentSpeed) * 0.05;
    }

    body.setVelocityX(this.currentSpeed);

    // === ПРЫЖОК ===
    if (this.controls.jump && body.blocked.down) {
      body.setVelocityY(-520);
    }

    // === ПЛАТФОРМЫ ===
    this.platformManager.update();

    // === ОЧКИ ===
    // + очки за дистанцию (зависит от скорости)
    this.score += this.currentSpeed * (delta / 1000);
    this.scoreText.setText(Math.floor(this.score));

    // === СМЕРТЬ ===
    if (this.player.y > this.scale.height + 300) {
      this.scene.restart();
    }
  }
}
