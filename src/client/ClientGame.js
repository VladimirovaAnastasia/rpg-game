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

  initEngine() {
    this.engine.loadSprites(sprites).then(() => {
      this.map.init();
      this.engine.on('render', (_, time) => {
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
    return new ClientEngine(document.getElementById(this.cfg.tagId));
  }

  initKeys() {
    this.engine.input.onKey({
      ArrowLeft: (keyDown) => {
        if (keyDown) {
          this.player.moveByCellCoord(-1, 0, (cell) => cell.findObjectsByType('grass').length);
        }
      },
      ArrowRight: (keyDown) => {
        if (keyDown) {
          this.player.moveByCellCoord(1, 0, (cell) => cell.findObjectsByType('grass').length);
        }
      },
      ArrowUp: (keyDown) => {
        if (keyDown) {
          this.player.moveByCellCoord(0, -1, (cell) => cell.findObjectsByType('grass').length);
        }
      },
      ArrowDown: (keyDown) => {
        if (keyDown) {
          this.player.moveByCellCoord(0, 1, (cell) => cell.findObjectsByType('grass').length);
        }
      },
    });
  }

  static init(cfg) {
    if (!ClientGame.cfg) {
      ClientGame.cfg = new ClientGame(cfg);
    }
  }
}

export default ClientGame;
