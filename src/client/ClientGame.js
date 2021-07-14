import ClientEngine from './ClientEngine';
import sprites from '../configs/sprites';
import levelCfg from '../configs/world.json';
import ClientWorld from './ClientWorld';

class ClientGame {
  constructor(cfg) {
    Object.assign(this, { cfg });

    this.engine = this.createEngine();
    this.map = this.createWorld();
    this.initEngine();
  }

  initEngine() {
    this.engine.loadSprites(sprites).then(() => {
      this.engine.on('render', (_, time) => {
        this.map.init();
      });
      this.engine.start();
    });
  }

  createWorld() {
    return new ClientWorld(this, this.engine, levelCfg);
  }

  createEngine() {
    return new ClientEngine(document.getElementById(this.cfg.tagId));
  }

  static init(cfg) {
    if (!ClientGame.cfg) {
      ClientGame.cfg = new ClientGame(cfg);
    }
  }
}

export default ClientGame;
