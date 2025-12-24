const tg = window.Telegram?.WebApp;
if (tg) {
  tg.ready();
  tg.expand();
}

const config = {
  type: Phaser.AUTO,
  parent: 'game',
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: '#5ec6ff',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 900 },
      debug: false
    }
  },
  scene: {
    create,
    update
  }
};

const game = new Phaser.Game(config);

let player;
let platforms;
let stars;
let cursors;
let score = 0;
let scoreText;

function create() {
  // платформы
  platforms = this.physics.add.staticGroup();

  platforms.create(400, config.height - 40, null)
    .setDisplaySize(config.width, 80)
    .refreshBody();

  platforms.create(600, 400, null)
    .setDisplaySize(200, 30)
    .refreshBody();

  platforms.create(200, 280, null)
    .setDisplaySize(200, 30)
    .refreshBody();

  platforms.getChildren().forEach(p => {
    p.setFillStyle(0x2f6b2f);
  });

  // игрок
  player = this.add.rectangle(100, 100, 40, 40, 0xffd000);
  this.physics.add.existing(player);
  player.body.setCollideWorldBounds(true);
  player.body.setBounce(0.1);

  this.physics.add.collider(player, platforms);

  // звёзды
  stars = this.physics.add.group();

  for (let i = 0; i < 10; i++) {
    const star = this.add.circle(200 + i * 120, 50, 10, 0xfff200);
    this.physics.add.existing(star);
    star.body.setBounce(0.4);
    star.body.setCollideWorldBounds(true);
    stars.add(star);
  }

  this.physics.add.collider(stars, platforms);
  this.physics.add.overlap(player, stars, collectStar, null, this);

  cursors = this.input.keyboard.createCursorKeys();

  scoreText = this.add.text(16, 16, 'Score: 0', {
    fontSize: '20px',
    fill: '#000'
  });
}

function update() {
  if (cursors.left.isDown) {
    player.body.setVelocityX(-300);
  } else if (cursors.right.isDown) {
    player.body.setVelocityX(300);
  } else {
    player.body.setVelocityX(0);
  }

  if (cursors.up.isDown && player.body.blocked.down) {
    player.body.setVelocityY(-550);
  }
}

function collectStar(player, star) {
  star.destroy();
  score += 10;
  scoreText.setText('Score: ' + score);
}
