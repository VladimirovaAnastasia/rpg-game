import './index.scss';
import SenseiWalk from './assets/Female-5-Walk.png';
import ClientGame from './client/ClientGame';

const header = document.getElementById('loading-header');

const canvas = document.querySelector('#game');
const ctx = canvas.getContext('2d');

const layoutCanvas = document.querySelector('#game-layout');
const layoutCtx = layoutCanvas.getContext('2d');

const spriteH = 48;
const spriteW = 48;
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const shots = 3;
let cycle = 0;

let button = null;
let pY = (canvasWidth - spriteW) / 2;
let pX = (canvasHeight - spriteH) / 2;
let direction = 0;

// Логика движения игрока
const keyUpHandler = (e) => {
  button = null;
};
const keyDownHandler = (e) => {
  button = e.key;
};

document.addEventListener('keyup', keyUpHandler);
document.addEventListener('keydown', keyDownHandler);

const img = document.createElement('img');
img.src = SenseiWalk;

const walk = () => {
  switch (button) {
    case 'Down':
    case 'ArrowDown':
      if (pY < canvasHeight - spriteH) {
        direction = 0;
        pY += 10;
        cycle = (cycle + 1) % shots;
      }
      break;
    case 'Up':
    case 'ArrowUp':
      if (pY > 0) {
        direction = 3;
        pY -= 10;
        cycle = (cycle + 1) % shots;
      }
      break;
    case 'Right':
    case 'ArrowRight':
      if (pX < canvasWidth - spriteW) {
        direction = 2;
        pX += 10;
        cycle = (cycle + 1) % shots;
      }
      break;
    case 'Left':
    case 'ArrowLeft':
      if (pX > 0) {
        direction = 1;
        pX -= 10;
        cycle = (cycle + 1) % shots;
      }
      break;
  }
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.drawImage(img, cycle * spriteW, direction * spriteW, spriteH, spriteW, pX, pY, 48, 48);

  requestAnimationFrame(walk);
};

img.addEventListener('load', () => {
  requestAnimationFrame(walk);
});

// Инициализация игры
window.addEventListener('load', () => {
  header.classList.add('hide');
  ClientGame.init({ tagId: 'game-layout', spriteW, spriteH });
});
