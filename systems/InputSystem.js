export default class InputSystem {
  constructor(scene) {
    this.scene = scene;

    // Направление движения
    this.direction = { x: 0, y: 0 };

    // Клавиатура
    this.keys = scene.input.keyboard.addKeys({
      up: "W",
      down: "S",
      left: "A",
      right: "D",
      upArrow: "UP",
      downArrow: "DOWN",
      leftArrow: "LEFT",
      rightArrow: "RIGHT"
    });
  }

  update() {
    this.direction.x = 0;
    this.direction.y = 0;

    // Горизонталь
    if (this.keys.left.isDown || this.keys.leftArrow.isDown) {
      this.direction.x = -1;
    } else if (this.keys.right.isDown || this.keys.rightArrow.isDown) {
      this.direction.x = 1;
    }

    // Вертикаль
    if (this.keys.up.isDown || this.keys.upArrow.isDown) {
      this.direction.y = -1;
    } else if (this.keys.down.isDown || this.keys.downArrow.isDown) {
      this.direction.y = 1;
    }

    // Нормализация (чтобы диагональ не была быстрее)
    if (this.direction.x !== 0 && this.direction.y !== 0) {
      const length = Math.sqrt(
        this.direction.x * this.direction.x +
        this.direction.y * this.direction.y
      );
      this.direction.x /= length;
      this.direction.y /= length;
    }
  }

  getDirection() {
    return this.direction;
  }
}
