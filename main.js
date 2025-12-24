const tg = window.Telegram?.WebApp;
if (tg) {
  tg.ready();
  tg.expand();
}

let player;
let platforms;
let stars;
let cursors;
let score = 0;
let scoreText;

const config = {
  type: Phaser.AUTO,
  parent: "game",
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: "#5c9cff",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 600 },
      debug: false
    }
  },
  scene: {
    create,
    update
  }
};

new Phaser.Game(config);

function create() {
  // платформы
  platforms = this.physics.add.staticGroup();

  platforms.create(config.width / 2, config.height - 20)
    .setDisplaySize(config.width, 40)
    .refreshBody();

  platforms.create(400, 400)
    .setDisplaySize(200, 30)
    .refreshBody();

  platforms.create(200, 280)
    .setDisplaySize(200, 30)
    .refreshBody();

  // игрок
  player = this.add.rectangle(100, 100, 40, 40, 0xffd000);
  this.physics.add.existing(player);

  player.body.setCollideWorldBounds(true);
  player.body.setBounce(0.1);

  this.physics.add.collider(player, platforms);

  // звёзды
  stars = this.physics.add.group();

  for (let i = 0; i < 6; i++) {
    const star = this.add.circle(200 + i * 120, 50, 10, 0xfff200);
    this.physics.add.existing(star);
    star.body.setBounce(0.4);
    stars.add(star);
  }

  this.physics.add.collider(stars, platforms);
  this.physics.add.overlap(player, stars, collectStar, null, this);

  cursors = this.input.keyboard.createCursorKeys();

  scoreText = this.add.text(16, 16, "Score: 0", {
    fontSize: "24px",
    color: "#ffffff"
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

  if (cursors.up.isDown && player.body.touching.down) {
    player.body.setVelocityY(-450);
  }
}

function collectStar(player, star) {
  star.destroy();
  score += 10;
  scoreText.setText("Score: " + score);
}
