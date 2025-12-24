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
    create,
    update
  }
};

const game = new Phaser.Game(config);

let player;
let cursors;

function create() {
  // создаём игрока как квадрат
  player = this.add.rectangle(
    config.width / 2,
    config.height / 2,
    40,
    40,
    0xffd000
  );

  this.physics.add.existing(player);
  player.body.setCollideWorldBounds(true);

  cursors = this.input.keyboard.createCursorKeys();
}

function update() {
  const speed = 250;
  player.body.setVelocity(0);

  if (cursors.left.isDown) player.body.setVelocityX(-speed);
  if (cursors.right.isDown) player.body.setVelocityX(speed);
  if (cursors.up.isDown) player.body.setVelocityY(-speed);
  if (cursors.down.isDown) player.body.setVelocityY(speed);
}
