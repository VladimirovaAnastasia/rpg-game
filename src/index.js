import './index.scss';
import ClientGame from './client/ClientGame';

const header = document.getElementById('loading-header');

const spriteH = 48;
const spriteW = 48;

// Инициализация игры
window.addEventListener('load', () => {
  header.classList.add('hide');
  ClientGame.init({ tagId: 'game', spriteW, spriteH });
});
