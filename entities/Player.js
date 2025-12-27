export default class Player {
  constructor(scene, x, y) {
    this.scene = scene;

    this.gameObject = scene.add.rectangle(x, y, 40, 40, 0x00ff00);
    scene.physics.add.existing(this.gameObject);

    this.body = this.gameObject.body;
    this.body.setCollideWorldBounds(true);

    this.speed = 220;
    this.hp = 100;
  }

  update(inputSystem) {
    const dir = inputSystem.getDirection();
    this.body.setVelocity(dir.x * this.speed, dir.y * this.speed);
  }

  takeDamage(amount) {
    this.hp -= amount;
    this.scene.events.emit("player-hp", this.hp);

    if (this.hp <= 0) {
      this.gameObject.destroy();
    }
  }

  get x() { return this.gameObject.x; }
  get y() { return this.gameObject.y; }
  get active() { return this.gameObject.active; }
}
