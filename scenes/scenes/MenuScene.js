class MenuScene extends Phaser.Scene {
  constructor() {
    super('Menu');
  }

  create() {
    const { width, height } = this.scale;

    this.add.text(width / 2, height / 2 - 40, 'SURVIVAL GAME', {
      fontSize: '32px',
      color: '#ffffff'
    }).setOrigin(0.5);

    const startBtn = this.add.text(width / 2, height / 2 + 40, 'START', {
      fontSize: '24px',
      backgroundColor: '#1e90ff',
      padding: { x: 20, y: 10 }
    }).setOrigin(0.5).setInteractive();

    startBtn.on('pointerdown', () => {
      this.scene.start('Game');
    });
  }
}
