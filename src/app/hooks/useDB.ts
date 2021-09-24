import { IDBPDatabase } from 'idb';
import { useCallback, useEffect, useState } from 'react';
import { loading, loadingMessage, loadingState } from '../../features/app/appSlice';
import { InfrastructureService } from '../../services/extended/services/InfrastructureService';
import {
  BuildingService, ExchangeService,
  MaterialService,
  PlanetService,
  Recipe_MinimalRecipe,
  RecipesService, SystemstarsService
} from '../../services/openapi';
import { BuildingData, CXListingData, MaterialData, PlanetData, SystemData } from '../datatypes';
import { initDB, NadirDBSchema, NadirDBStoreName, SectorData } from '../db';
import { useAppDispatch } from '../hooks';

const DATA_TIMEOUT = {
  'sectors': 7 * 24 * 60 * 60 * 1000, // weekly
  'systems': 7 * 24 * 60 * 60 * 1000, // weekly
  'planets': 24 * 60 * 60 * 1000, // daily
  'recipes': 7 * 24 * 60 * 60 * 1000, // weekly
  'buildings': 7 * 24 * 60 * 60 * 1000, // weekly
  'materials': 7 * 24 * 60 * 60 * 1000, // weekly
  'cx': 60 * 60 * 1000, // hourly
}

let DB: IDBPDatabase<NadirDBSchema>;

type NadirDBUpdater = (store: 'all' | NadirDBStoreName | NadirDBStoreName[], force?: boolean) => Promise<void>

export type DBRunnable = (db: IDBPDatabase<NadirDBSchema>) => Promise<void>;


export const useDB = (runDB: DBRunnable|undefined = undefined, updateFirst: boolean = false): [IDBPDatabase<NadirDBSchema> | undefined, NadirDBUpdater] => {
  const dispatch = useAppDispatch();
  const [db, setDb] = useState<IDBPDatabase<NadirDBSchema> | undefined>(DB);

  const updateDB = useCallback<NadirDBUpdater>(async (store, force = false) => {
    if (db) {
      // fetch the API data to get the store up to date
      const stores = typeof store === 'string' ? [store] : store;
      const now = (new Date()).getTime();
      console.log('running update...', stores);
      dispatch(loading(true));
      dispatch(loadingMessage('Loading Data...'));
      if (stores.indexOf('sectors') > -1 || store === 'all') {
        dispatch(loadingMessage('Loading Sectors...'));
        const lu = await db.get('lastUpdated', 'sectors') || 0;
        if ((lu < now - DATA_TIMEOUT['sectors']) || force) {
          // get planets from api
          try {
            const systems = await SystemstarsService.getSystemstarsService1();
            systems.forEach((s: SectorData) => s.SectorId ? db.put('sectors', s) : console.log('no sectorid', s));
            await db.put('lastUpdated', now, 'sectors');
          } catch(e) {
            dispatch(loadingMessage('Error: '+e.toString()))
            throw e;
          }
        }
      }
      if (stores.indexOf('systems') > -1 || store === 'all') {
        dispatch(loadingMessage('Loading Systems...'));
        const lu = await db.get('lastUpdated', 'systems') || 0;
        if ((lu < now - DATA_TIMEOUT['systems']) || force) {
          // get planets from api
          try {
            const systems = await SystemstarsService.getSystemstarsService();
            systems.forEach((s: SystemData) => s.SystemId ? db.put('systems', s) : console.log('no systemid', s));
            await db.put('lastUpdated', now, 'systems');
          } catch(e) {
            dispatch(loadingMessage('Error: '+e.toString()))
            throw e;
          }
        }
      }
      if (stores.indexOf('planets') > -1 || store === 'all') {
        dispatch(loadingMessage('Loading Planets...'));
        const lu = await db.get('lastUpdated', 'planets') || 0;
        if ((lu < now - DATA_TIMEOUT['planets']) || force) {
          // get planets from api
          try {
            const planets = await PlanetService.getPlanetService1();
            const planets_infra = await InfrastructureService.getAllInfrastructure();
            // await db.clear('planets');
            planets.forEach((p: PlanetData) => {
              const infra = planets_infra.find(i => i.PopulationId === p.PopulationId);
              if(infra) {
                p.CurrentInfrastructure = infra;
                p.CurrentTotalPopulation = (infra.InfrastructureReport.NextPopulationPioneer || 0)
                  + (infra.InfrastructureReport.NextPopulationSettler || 0)
                  + (infra.InfrastructureReport.NextPopulationTechnician || 0)
                  + (infra.InfrastructureReport.NextPopulationEngineer || 0)
                  + (infra.InfrastructureReport.NextPopulationScientist || 0);
                console.log(p.PlanetName, p.CurrentTotalPopulation)
              } else {
                // console.log('did not find infra for ',p.PlanetName, p.PopulationId, planets_infra.length)
              }
              p.PlanetId ? db.put('planets', p) : console.log('no planetid', p)
            });
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
      if (stores.indexOf('cx') > -1 || store === 'all') {
        dispatch(loadingMessage('Loading CX Data...'));
        const lu = await db.get('lastUpdated', 'cx') || 0;
        if ((lu < now - DATA_TIMEOUT['cx']) || force) {
          // get planets from api
          try {
            const cx = await ExchangeService.getExchangeService2();
            cx.forEach((l: CXListingData) => l.CXDataModelId ? db.put('cx', l) : console.log('no data id', l));
            await db.put('lastUpdated', now, 'cx');
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
