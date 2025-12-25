import { GAME_CONFIG } from './config/gameConfig.js';
import BootScene from './scenes/BootScene.js';
import GameScene from './scenes/GameScene.js';

const config = {
  type: Phaser.AUTO,
  width: GAME_CONFIG.size.width,
  height: GAME_CONFIG.size.height,
  backgroundColor: '#6fa8dc',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: GAME_CONFIG.physics.gravity },
      debug: false,
    },
  },
  scene: [BootScene, GameScene],
};

new Phaser.Game(config);
