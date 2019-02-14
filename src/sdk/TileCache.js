import ss from './scriptsharp/ss';
let Tile;
import('./Tile').then((module) => Tile = module.Tile);
import {Vector3d} from './Double3d';
import {Imageset} from './Imageset';

export class TileCache {
  static getTile(level, x, y, dataset, parent) {
    let retTile = null;
    const tileKey = Imageset.getTileKey(dataset, level, x, y);
    if (!ss.keyExists(TileCache._tiles, tileKey)) {
      retTile = Imageset.getNewTile(dataset, level, x, y, parent);
      TileCache._tiles[tileKey] = retTile;
    } else {
      retTile = TileCache._tiles[tileKey];
    }
    const p = 0;
    return retTile;
  }

  static getCachedTile(level, x, y, dataset, parent) {
    if (level < dataset.get_baseLevel()) {
      return null;
    }
    let retTile = null;
    const tileKey = Imageset.getTileKey(dataset, level, x, y);
    try {
      if (!ss.keyExists(TileCache._tiles, tileKey)) {
        return null;
      } else {
        retTile = TileCache._tiles[tileKey];
      }
    } catch ($e1) {
    }
    return retTile;
  }

  static getReadyToRenderTileCount() {
    const notReadyCullList = [];
    const readyCullList = [];
    try {
      try {
        const $enum1 = ss.enumerate(ss.keys(TileCache._tiles));
        while ($enum1.moveNext()) {
          const key = $enum1.current;
          const tile = TileCache._tiles[key];
          if (tile.renderedGeneration < (Tile.currentRenderGeneration - 10) && !(tile.requestPending || tile.downloading)) {
            if (tile.readyToRender) {
              readyCullList.push(tile);
            } else {
              notReadyCullList.push(tile);
            }
          }
        }
      } catch ($e2) {
      }
      return readyCullList.length;
    } catch ($e3) {
      return -1;
    }
  }

  static processQueue(renderContext) {
    while (ss.keyCount(TileCache._queue) > 0 && TileCache.openThreads > 0) {
      let minDistance = 100000;
      let overlayTile = false;
      let maxKey = null;
      let level = 1000;
      const $enum1 = ss.enumerate(ss.keys(TileCache._queue));
      while ($enum1.moveNext()) {
        const key = $enum1.current;
        const t = TileCache._queue[key];
        if (!t.requestPending && t.inViewFrustum) {
          const vectTemp = Vector3d.makeCopy(t.get_sphereCenter());
          vectTemp._transformByMatrics(renderContext.get_world());
          if (renderContext.space) {
            vectTemp.subtract(new Vector3d(0, 0, -1));
          } else {
            vectTemp.subtract(renderContext.cameraPosition);
          }
          const distTemp = Math.max(0, vectTemp.length() - t.get_sphereRadius());
          const thisIsOverlay = (t.get_dataset().get_projection() === 2) || (t.get_dataset().get_projection() === 5);
          if (distTemp < minDistance && (!overlayTile || thisIsOverlay)) {
            minDistance = distTemp;
            maxKey = t.get_key();
            level = t.level;
            overlayTile = thisIsOverlay;
          }
        }
      }
      if (maxKey != null) {
        const workTile = TileCache._queue[maxKey];
        workTile.requestPending = true;
        TileCache.openThreads--;
        if (TileCache.openThreads < 0) {
          TileCache.openThreads = 0;
        }
        workTile.requestImage();
        if (workTile.get_dataset().get_elevationModel()) {
          workTile.requestDem();
        }
      } else {
        return;
      }
    }
  }

  static addTileToQueue(tile) {
    let hitValue;
    hitValue = 256;
    if (!tile.downloading && !tile.readyToRender) {
      if (ss.keyExists(TileCache._queue, tile.get_key())) {
        TileCache._queue[tile.get_key()].requestHits += hitValue;
      } else {
        tile.requestHits = hitValue;
        TileCache._queue[tile.get_key()] = tile;
      }
    }
    return true;
  };

  static removeFromQueue(key, complete) {
    if (complete) {
      const workTile = TileCache._queue[key];
      if (workTile != null) {
        workTile.requestPending = false;
        delete TileCache._queue[workTile.get_key()];
      }
      TileCache.openThreads++;
    }
    delete TileCache._queue[key];
  };

  static clearCache() {
    ss.clearKeys(TileCache._tiles);
  };

  static purgeQueue() {
    ss.clearKeys(TileCache._queue);
  };

  static purgeLRU() {
    if (ss.keyCount(TileCache._tiles) < TileCache.maxReadyToRenderSize) {
      return;
    }
    const notReadyCullList = [];
    const readyCullList = [];
    try {
      try {
        const $enum1 = ss.enumerate(ss.keys(TileCache._tiles));
        while ($enum1.moveNext()) {
          const key = $enum1.current;
          var tile = TileCache._tiles[key];
          if (tile.renderedGeneration < (Tile.currentRenderGeneration - 10) && !(tile.requestPending || tile.downloading)) {
            if (tile.readyToRender) {
              readyCullList.push(tile);
            } else {
              notReadyCullList.push(tile);
            }
          }
        }
      } catch ($e2) {
      }
      TileCache.readyToRenderCount = readyCullList.length;
      if (readyCullList.length > TileCache.maxReadyToRenderSize) {
        readyCullList.sort((t1, t2) => (t2.accessCount < t1.accessCount) ? 1 : ((t2.accessCount === t1.accessCount) ? 0 : -1));
        var totalToPurge = readyCullList.length - TileCache.maxReadyToRenderSize;
        const $enum3 = ss.enumerate(readyCullList);
        while ($enum3.moveNext()) {
          var tile = $enum3.current;
          if (totalToPurge < 1) {
            break;
          }
          tile.cleanUp(false);
          totalToPurge--;
        }
      }
      if (ss.keyCount(TileCache._tiles) < TileCache.maxTileCacheSize) {
        return;
      }
      if (notReadyCullList.length > TileCache.maxTileCacheSize) {
        notReadyCullList.sort((t1, t2) => (t2.accessCount < t1.accessCount) ? 1 : ((t2.accessCount === t1.accessCount) ? 0 : -1));
        var totalToPurge = notReadyCullList.length - TileCache.maxTileCacheSize;
        if (totalToPurge > 20) {
          totalToPurge = 20;
        }
        const $enum4 = ss.enumerate(notReadyCullList);
        while ($enum4.moveNext()) {
          var tile = $enum4.current;
          if (totalToPurge < 1) {
            break;
          }
          tile.cleanUp(true);
          delete TileCache._tiles[tile.get_key()];
          totalToPurge--;
        }
      }
    } catch ($e5) {
    } finally {
    }
    return;
  };

  static decimateQueue() {
    const list = [];
    const $enum1 = ss.enumerate(ss.keys(TileCache._queue));
    while ($enum1.moveNext()) {
      const key = $enum1.current;
      var t = TileCache._queue[key];
      if (!t.requestPending) {
        t.requestHits = t.requestHits / 2;
        try {
          if (t.requestHits < 2) {
            list.push(t);
          } else if (!t.inViewFrustum) {
            list.push(t);
          }
        } catch ($e2) {
        }
      }
    }
    const $enum3 = ss.enumerate(list);
    while ($enum3.moveNext()) {
      var t = $enum3.current;
      delete TileCache._queue[t.get_key()];
    }
  };
}