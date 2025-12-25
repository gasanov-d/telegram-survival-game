class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  create() {
    const w = this.scale.width;
    const h = this.scale.height;

    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(w / 2, h - 20).setDisplaySize(w, 40).refreshBody();
    this.platforms.create(300, h - 200).setDisplaySize(300, 30).refreshBody();

    this.player = this.add.rectangle(100, h - 300, 40, 40, 0xffd700);
    this.physics.add.existing(this.player);
    this.player.body.setCollideWorldBounds(true);

    this.physics.add.collider(this.player, this.platforms);

    this.controls = new MobileControls(this);
  }

  update() {
    const body = this.player.body;
    body.setVelocityX(0);

    if (this.controls.left) body.setVelocityX(-300);
    if (this.controls.right) body.setVelocityX(300);

    if (this.controls.jump && body.blocked.down) {
      body.setVelocityY(-600);
    }
  }
}
