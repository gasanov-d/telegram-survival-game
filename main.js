// Telegram
const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

// Phaser config
const config = {
  type: Phaser.AUTO,
  parent: 'game',
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: '#6fa8dc',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 800 },
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
let score = 0;
let scoreText;
let cursors;

function create() {
  // Platforms
  platforms = this.physics.add.staticGroup();

  platforms.create(config.width / 2, config.height - 20)
    .setDisplaySize(config.width, 40)
    .refreshBody();

  platforms.create(400, 450).setDisplaySize(300, 30).refreshBody();
  platforms.create(800, 320).setDisplaySize(300, 30).refreshBody();
  platforms.create(200, 250).setDisplaySize(200, 30).refreshBody();

  platforms.getChildren().forEach(p => {
    p.setFillStyle(0x000000);
    p.setStrokeStyle(4, 0x00ff00);
  });

  // Player
  player = this.add.rectangle(100, 100, 40, 40, 0xffd700);
  this.physics.add.existing(player);
  player.body.setCollideWorldBounds(true);
  player.body.setBounce(0.1);

  this.physics.add.collider(player, platforms);

  // Stars
  stars = this.physics.add.group();

  for (let i = 0; i < 10; i++) {
    const star = this.add.circle(200 + i * 60, 0, 12, 0xffff00);
    this.physics.add.existing(star);
    star.body.setBounce(0.4);
    star.body.setCollideWorldBounds(true);
    stars.add(star);
  }

  this.physics.add.collider(stars, platforms);
  this.physics.add.overlap(player, stars, collectStar, null, this);

  // Score
  scoreText = this.add.text(20, 20, 'Score: 0', {
    fontSize: '24px',
    fill: '#ffffff'
  });

  // Controls
  cursors = this.input.keyboard.createCursorKeys();

  // Mobile tap jump
  this.input.on('pointerdown', () => {
    if (player.body.touching.down) {
      player.body.setVelocityY(-500);
    }
  });
}

function update() {
  if (cursors.left.isDown) {
    player.body.setVelocityX(-200);
  } else if (cursors.right.isDown) {
    player.body.setVelocityX(200);
  } else {
    player.body.setVelocityX(0);
  }

  if (cursors.up.isDown && player.body.touching.down) {
    player.body.setVelocityY(-500);
  }
}

function collectStar(player, star) {
  star.destroy();
  score += 10;
  scoreText.setText('Score: ' + score);
}
