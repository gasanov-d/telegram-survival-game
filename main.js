const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

const config = {
  type: Phaser.AUTO,
  parent: 'game',
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: '#6fa8dc',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 1200 },
      debug: false
    }
  },
  scene: [BootScene, MenuScene, GameScene]
};

new Phaser.Game(config);
