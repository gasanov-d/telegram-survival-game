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

    this.platforms.create(w / 2, h - 150)
      .setDisplaySize(200, 30)
      .refreshBody();

    // игрок
    this.player = this.add.rectangle(100, h - 200, 40, 40, 0xffd700);
    this.physics.add.existing(this.player);
    this.player.body.setCollideWorldBounds(true);
    this.player.body.setBounce(0.1);

    this.physics.add.collider(this.player, this.platforms);

    // текст
    this.score = 0;
    this.scoreText = this.add.text(10, 10, 'Score: 0', {
      fontSize: '18px',
      fill: '#ffffff'
    });

    // управление (тап = прыжок)
    this.input.on('pointerdown', () => {
      if (this.player.body.touching.down) {
        this.player.body.setVelocityY(-500);
      }
    });
  }

  update() {
    // простое движение вправо
    this.player.body.setVelocityX(150);
  }
}
