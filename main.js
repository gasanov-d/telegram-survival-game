const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

const config = {
  type: Phaser.AUTO,
  parent: 'game',
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: '#2d6a4f',
  physics: {
    default: 'arcade',
    arcade: { debug: false }
  },
  scene: {
    preload,
    create,
    update
  }
};

const game = new Phaser.Game(config);

let player;
let cursors;

function preload() {
  this.load.image('player', 'https://i.imgur.com/6QKQ4QF.png');
}

function create() {
  player = this.physics.add.sprite(
    config.width / 2,
    config.height / 2,
    'player'
  );

  player.setCollideWorldBounds(true);
  cursors = this.input.keyboard.createCursorKeys();
}

function update() {
  const speed = 200;
  player.setVelocity(0);

  if (cursors.left.isDown) player.setVelocityX(-speed);
  if (cursors.right.isDown) player.setVelocityX(speed);
  if (cursors.up.isDown) player.setVelocityY(-speed);
  if (cursors.down.isDown) player.setVelocityY(speed);
}
