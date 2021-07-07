import './index.scss';
import SenseiWalk from './assets/Female-5-Walk.png';

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

let bottomPressed = false;
let topPressed = false;
let leftPressed = false;
let rightPressed = false;
let pY = (canvasWidth - spriteW) / 2;
let pX = (canvasHeight - spriteH) / 2;
let direction = 0;

const keyUpHandler = (e) => {
  if (e.key === 'Down' || e.key === 'ArrowDown') {
    bottomPressed = false;
    direction = 0;
  }
  if (e.key === 'Up' || e.key === 'ArrowUp') {
    topPressed = false;
    direction = 3;
  }
  if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = false;
    direction = 1;
  }
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = false;
    direction = 2;
  }
};
const keyDownHandler = (e) => {
  if (e.key === 'Down' || e.key === 'ArrowDown') {
    bottomPressed = true;
  }
  if (e.key === 'Up' || e.key === 'ArrowUp') {
    topPressed = true;
  }
  if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = true;
  }
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = true;
  }
};

document.addEventListener('keyup', keyUpHandler);
document.addEventListener('keydown', keyDownHandler);

const img = document.createElement('img');
img.src = SenseiWalk;

img.addEventListener('load', () => {
  setInterval(() => {
    if (bottomPressed && pY < canvasHeight - spriteH) {
      pY += 10;
      cycle = (cycle + 1) % shots;
    }
    if (topPressed && pY > 0) {
      pY -= 10;
      cycle = (cycle + 1) % shots;
    }
    if (rightPressed && pX < canvasWidth - spriteW) {
      pX += 10;
      cycle = (cycle + 1) % shots;
    }
    if (leftPressed && pX > 0) {
      pX -= 10;
      cycle = (cycle + 1) % shots;
    }
    ctx.clearRect(0, 0, 600, 600);
    ctx.drawImage(img, cycle * spriteW, direction * spriteW, spriteH, spriteW, pX, pY, 48, 48);
  }, 120);
});

layoutCtx.strokeStyle = 'green';
for (let i = 0; i < canvasWidth / spriteW; i++) {
  for (let j = 0; j < canvasHeight / spriteH; j++) {
    layoutCtx.strokeRect(i * (spriteW - 2), j * (spriteH - 2), spriteW, spriteH);
  }
}
