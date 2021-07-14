import worldConf from '../configs/world.json';

class ClientWorld {
  constructor(game, engine, levelCfg) {
    Object.assign(this, {
      game,
      engine,
      levelCfg,
      height: levelCfg.map.length,
      width: levelCfg.map[0].length,
      spriteW: game.cfg.spriteW,
      spriteH: game.cfg.spriteH,
    });
  }

  init() {
    const { map } = worldConf;

    map.forEach((cfgRow, y) => {
      cfgRow.forEach((cfgCell, x) => {
        this.engine.renderSpriteFrame({
          sprite: ['terrain', cfgCell[0]],
          frame: 0,
          x: x * this.spriteW,
          y: y * this.spriteH,
          w: this.spriteW,
          h: this.spriteH,
        });
      });
    });
  }
}

export default ClientWorld;
