import { gameConfig } from './config/gameConfig.js';

const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

new Phaser.Game(gameConfig);
