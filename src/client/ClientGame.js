import ClientEngine from './ClientEngine';
import sprites from '../configs/sprites';
import levelCfg from '../configs/world.json';
import ClientWorld from './ClientWorld';
import gameObjects from '../configs/gameObjects.json';

class ClientGame {
  constructor(cfg) {
    Object.assign(this, { cfg, gameObjects, player: null });

    this.engine = this.createEngine();
    this.map = this.createWorld();
    this.initEngine();
  }

  setPlayer(player) {
    this.player = player;
  }

  getWorld() {
    return this.map;
  }

  initEngine() {
    this.engine.loadSprites(sprites).then(() => {
      this.map.init();
      this.engine.on('render', (_, time) => {
        this.engine.camera.focusGameObject(this.player);
        this.map.render(time);
      });
      this.engine.start();
      this.initKeys();
    });
  }

  createWorld() {
    return new ClientWorld(this, this.engine, levelCfg);
  }

  createEngine() {
    return new ClientEngine(document.getElementById(this.cfg.tagId), this);
  }

  movePlayerToDir(dir) {
    const dirs = {
      left: [-1, 0],
      right: [1, 0],
      up: [0, -1],
      down: [0, 1],
    };

    const { player } = this;

    if (player && player.motionProgress === 1) {
      const canMove = this.player.moveByCellCoord(
        dirs[dir][0],
        dirs[dir][1],
        (cell) => cell.findObjectsByType('grass').length,
      );

      if (canMove) {
        player.setState(dir);
        player.once('motion-stopped', () => player.setState('main'));
      }
    }
  }

  initKeys() {
    this.engine.input.onKey({
      ArrowLeft: (keyDown) => keyDown && this.movePlayerToDir('left'),
      ArrowRight: (keyDown) => keyDown && this.movePlayerToDir('right'),
      ArrowUp: (keyDown) => keyDown && this.movePlayerToDir('up'),
      ArrowDown: (keyDown) => keyDown && this.movePlayerToDir('down'),
    });
  }

  static init(cfg) {
    if (!ClientGame.cfg) {
      ClientGame.cfg = new ClientGame(cfg);
    }
  }
}

export default ClientGame;
