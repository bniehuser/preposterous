import React from 'react';
import { Path, Tile as TileInfo, TileType } from '../../features/ui/uiSlice';
import { Browse } from '../components/ui/tiles/Browse';
import { BuildingInfo } from '../components/ui/tiles/BuildingInfo';
import { MaterialInfo } from '../components/ui/tiles/MaterialInfo';
import { Picker } from '../components/ui/tiles/Picker';
import { PlanetSearch } from '../components/ui/tiles/PlanetSearch';
import { PriceInfo } from '../components/ui/tiles/PriceInfo';
import { TestTile } from '../components/ui/tiles/TestTile';
import { db } from '../db';
import { camelToTitle } from './strings';
import { Map } from '../components/ui/tiles/Map';

export const getTile = async (ti: TileInfo, p: Path, i?: number) => {
//  console.log('getting',ti, p);
  switch (ti.c) {
    case TileType.BROWSE:
      const a = ti.a?.split(' ');
      if (a && ['BUI', 'MAT'].some(m => a[0] === m)) {
        return {t: 'Browser', d: <Browse m={a[0] as 'BUI' | 'MAT'} i={a[1]}/>};
      } else {
        return {t: '', d: null, e: 'Illegal Argument'};
      }
    case TileType.MAP:
      return {t: 'Map', d: <Map/>}
    case TileType.BUI:
      const b = await db.get('buildings', ti.a as string);
      if (!b) {
        return {t: '', d: null, e: 'Illegal Argument'}
      }
      return {t: `Building: ${camelToTitle(b.Name)}`, d: <BuildingInfo building={b}/>};
    case TileType.PRICE:
      if (!ti.a) {
        return {t: '', d: null, e: 'Illegal Argument'}
      }
      return {t: `Price Check: ${ti.a}`, d: <PriceInfo listing={ti.a}/>};
    case TileType.MAT:
      const m = await db.getFromIndex('materials', 'ticker', ti.a as string);
      if (!m) {
        return {t: '', d: null, e: 'Illegal Argument'}
      }
      console.log('should be getting MATERIAL', m)
      return {t: `Material: ${camelToTitle(m.Name)}`, d: <MaterialInfo material={m}/>};
    case TileType.TEST:
      return {t: 'Test', d: <TestTile/>};
    case TileType.PLANETSEARCH:
      return {t: 'Planet Search', d: <PlanetSearch/>};
    case TileType.PICKER:
    default:
      return {t: '', d: <Picker s={ti.s} p={p} i={i}/>};
  }
}
