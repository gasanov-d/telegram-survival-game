export default class UIScene extends Phaser.Scene {
  constructor() {
    super('UIScene');
  }

  create() {
    // текст очков
    this.scoreText = this.add.text(16, 16, '0', {
      fontSize: '28px',
      fontFamily: 'Arial',
      color: '#ffffff'
    });

    this.scoreText.setScrollFactor(0);
    this.scoreText.setDepth(1000);

    // слушаем события из GameScene
    const gameScene = this.scene.get('GameScene');

    gameScene.events.on('score', score => {
      this.scoreText.setText(score);
    });
  }
}
