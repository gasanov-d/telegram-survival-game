export default class CollisionSystem {
  constructor(scene, player, enemies) {
    this.scene = scene;

    scene.physics.add.overlap(
      player,
      enemies,
      () => {
        player.takeDamage(10);
      }
    );
  }
}
