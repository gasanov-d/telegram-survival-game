import Player from '../entities/Player.js';
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

    this.platforms
      .create(w / 2, h - 20)
      .setDisplaySize(w, 40)
      .refreshBody();

    this.platforms
      .create(w / 2 - 150, h - 150)
      .setDisplaySize(250, 30)
      .refreshBody();

    this.platforms
      .create(w / 2 + 200, h - 300)
      .setDisplaySize(250, 30)
      .refreshBody();

    // игрок (СУЩНОСТЬ)
    this.player = new Player(this, 100, h - 200);

    // коллизия
    this.physics.add.collider(this.player.sprite, this.platforms);

    // мобильное управление
    this.controls = new MobileControls(this);
  }

  update() {
    // горизонтальное движение
    if (this.controls.left) {
      this.player.moveLeft();
    } else if (this.controls.right) {
      this.player.moveRight();
    } else {
      this.player.stop();
    }

    // прыжок (работает ОДНОВРЕМЕННО с движением)
    if (this.controls.jump) {
      this.player.jump();
    }
  }
}
