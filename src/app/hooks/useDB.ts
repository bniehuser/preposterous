import { IDBPDatabase } from 'idb';
import { useCallback, useEffect, useState } from 'react';
import { loading, loadingMessage, loadingState } from '../../features/app/appSlice';
import {
  BuildingService,
  MaterialService,
  PlanetService,
  Recipe_MinimalRecipe,
  RecipesService
} from '../../services/openapi';
import { BuildingData, MaterialData, PlanetData } from '../datatypes';
import { initDB, NadirDB, NadirDBStoreName } from '../db';
import { useAppDispatch } from '../hooks';

const DATA_TIMEOUT = {
  'planets': 1 * 24 * 60 * 60 * 1000,
  'recipes': 7 * 24 * 60 * 60 * 1000,
  'buildings': 7 * 24 * 60 * 60 * 1000,
  'materials': 7 * 24 * 60 * 60 * 1000,
}

let DB: IDBPDatabase<NadirDB>;

type NadirDBUpdater = (store: 'all' | NadirDBStoreName | NadirDBStoreName[], force?: boolean) => Promise<void>

export type DBRunnable = (db: IDBPDatabase<NadirDB>) => Promise<void>;


export const useDB = (runDB: DBRunnable|undefined = undefined, updateFirst: boolean = false): [IDBPDatabase<NadirDB> | undefined, NadirDBUpdater] => {
  const dispatch = useAppDispatch();
  const [db, setDb] = useState<IDBPDatabase<NadirDB> | undefined>(DB);

  const updateDB = useCallback<NadirDBUpdater>(async (store, force = false) => {
    if (db) {
      // fetch the API data to get the store up to date
      const stores = typeof store === 'string' ? [store] : store;
      const now = (new Date()).getTime();
      console.log('running update...', stores);
      dispatch(loading(true));
      dispatch(loadingMessage('Loading Data...'));
      if (stores.indexOf('planets') > -1 || store === 'all') {
        dispatch(loadingMessage('Loading Planets...'));
        const lu = await db.get('lastUpdated', 'planets') || 0;
        if ((lu < now - DATA_TIMEOUT['planets']) || force) {
          // get planets from api
          try {
            const planets = await PlanetService.getPlanetService1();
            console.log(planets[0]['PlanetId']);
            planets.forEach((p: PlanetData) => p.PlanetId ? db.put('planets', p) : console.log('no planetid', p));
            await db.put('lastUpdated', now, 'planets');
          } catch(e) {
            dispatch(loadingMessage('Error: '+e.toString()))
            throw e;
          }
        }
      }
      if (stores.indexOf('recipes') > -1 || store === 'all') {
        dispatch(loadingMessage('Loading Recipes...'));
        const lu = await db.get('lastUpdated', 'recipes') || 0;
        if ((lu < now - DATA_TIMEOUT['recipes']) || force) {
          // get planets from api
          try {
            console.log('trying recipes')
            const recipes = await RecipesService.getRecipesService1();
            recipes.forEach((r: Recipe_MinimalRecipe) => r.RecipeName ? db.put('recipes', r) : console.log('no recipeid', r));
            await db.put('lastUpdated', now, 'recipes');
            console.log('finished recipes', recipes[0], now)
          } catch(e) {
            console.log('failed reciped', e);
            dispatch(loadingMessage('Error: '+e.toString()))
            throw e;
          }
        }
      }
      if (stores.indexOf('buildings') > -1 || store === 'all') {
        dispatch(loadingMessage('Loading Buildings...'));
        const lu = await db.get('lastUpdated', 'buildings') || 0;
        if ((lu < now - DATA_TIMEOUT['buildings']) || force) {
          // get planets from api
          try {
            const buildings = await BuildingService.getBuildingService();
            buildings.forEach((b: BuildingData) => b.Ticker ? db.put('buildings', b) : console.log('no buildingid', b));
            await db.put('lastUpdated', now, 'buildings');
          } catch(e) {
            dispatch(loadingMessage('Error: '+e.toString()))
            throw e;
          }
        }
      }
      if (stores.indexOf('materials') > -1 || store === 'all') {
        dispatch(loadingMessage('Loading Materials...'));
        const lu = await db.get('lastUpdated', 'materials') || 0;
        if ((lu < now - DATA_TIMEOUT['materials']) || force) {
          // get planets from api
          try {
            const materials = await MaterialService.getMaterialService();
            materials.forEach((m: MaterialData) => m.MatId ? db.put('materials', m) : console.log('no matid', m));
            await db.put('lastUpdated', now, 'materials');
          } catch(e) {
            dispatch(loadingMessage('Error: '+e.toString()))
            throw e;
          }
        }
      }
      dispatch(loadingState({loading: false, loadingMessage: undefined, loadingPercent: undefined}));
    } else {
      console.log('no db yet...');
    }
  }, [dispatch, db]);

  useEffect(() => {
    if(!DB) {
      dispatch(loadingState({loading: true, loadingMessage: 'initializing database...'}));
      initDB().then(d => {
        setDb(d);
        DB = d;
        dispatch(loadingState({loading: false, loadingMessage: undefined}));
      });
    }
  }, [dispatch]);

  useEffect(() => {
    if(db && runDB && !LOADING) {
      LOADING = true;
      if(updateFirst) {
        console.log('should be updating');
        updateDB('all').then(() => runDB(db).then(() => LOADING = false));
      } else {
        runDB(db).then(() => LOADING = false);
      }
    }
  }, [runDB, db, updateFirst, updateDB])

  return [db, updateDB];
}

let LOADING = false;
