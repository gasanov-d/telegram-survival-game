import MobileControls from './MobileControls.js';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  create() {
    const w = this.scale.width;
    const h = this.scale.height;

    this.cameras.main.setBackgroundColor('#6fa8dc');

    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(w / 2, h - 20).setDisplaySize(w, 40).refreshBody();

    this.player = this.add.rectangle(100, h - 200, 40, 40, 0xff0000);
    this.physics.add.existing(this.player);

    this.player.body.setCollideWorldBounds(true);
    this.player.body.setBounce(0.1);

    this.physics.add.collider(this.player, this.platforms);

    this.controls = new MobileControls(this);
  }

  update() {
    const body = this.player.body;

    if (this.controls.left) {
      body.setVelocityX(-250);
    } else if (this.controls.right) {
      body.setVelocityX(250);
    } else {
      body.setVelocityX(0);
    }

    if (this.controls.jump && body.blocked.down) {
      body.setVelocityY(-500);
    }
  }
}
