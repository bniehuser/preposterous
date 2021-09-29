import { IDBPDatabase, StoreNames, StoreValue } from 'idb';
import * as idb from 'idb';
import { Recipe_MinimalRecipe } from '../services/openapi';
import {
  BuildingData,
  CXListingData,
  MaterialData,
  PlanetData,
  ProductionData, ShipData, SiteData,
  SystemData,
  WorkforceData
} from './datatypes';


export interface SectorData {
  SubSectors: {
    Vertices: {X: number, Y: number, Z: number}[];
    SSId: string;
  }[];
  SectorId: string;
  Name: string;
  HexQ: number,
  HexR: number,
  HexS: number,
  Size: number,
  UserNameSubmitted: string|null,
  Timestamp: string
}


export interface NadirDBSchema extends idb.DBSchema {
  sectors: {
    key: string;
    value: SectorData;
    indexes: { name: string }
  };
  systems: {
    key: string;
    value: SystemData;
    indexes: {
      id: string;
      name: string;
      sectorId: string;
      connections: string;
    };
  };
  planets: {
    key: string;
    value: PlanetData;
    indexes: { planetId: string };
  };
  recipes: {
    key: string;
    value: Recipe_MinimalRecipe;
    indexes: {
      inputs: string;
      outputs: string;
      building: string;
    }
  };
  buildings: {
    key: string;
    value: BuildingData;
    indexes: { expertise: string }
  };
  materials: {
    key: string;
    value: MaterialData;
    indexes: {
      ticker: string;
      category: string;
      name: string;
    }
  };
  cx: {
    key: string;
    value: CXListingData;
    indexes: {
      cxTicker: [string, string];
      ticker: string;
      cx: string;
    }
  };
  workforce: {
    key: string;
    value: WorkforceData;
    indexes: {
      planetId: string;
      type: string;
      material: string;
    }
  };
  production: {
    key: string;
    value: ProductionData;
    indexes: {
      planetId: string;
      input: string;
      output: string;
    }
  };
  ships: {
    key: string;
    value: ShipData;
    indexes: {
      store: string;
      registration: string;
      name: string;
      repairs: string;
    }
  };
  sites: {
    key: string;
    value: SiteData;
    indexes: {
      planetId: string;
      building: string;
      repairs: string;
      reclaims: string;
    }
  };
  lastUpdated: {
    key: NadirDBStoreName;
    value: number;
  };
}

export type NadirDBStoreName = StoreNames<NadirDBSchema>;
export type NadirDB = idb.IDBPDatabase<NadirDBSchema>;

export let db: NadirDB;
let loading = false;

export const initDB = async () => {
  if(!db && !loading) {
    console.log('going to open db...');
    loading = true;
    db = await idb.openDB<NadirDBSchema>('nadir', 1, {
      upgrade(db) {
        // NOTE: we don't care about old or new versions here.  for now, this is _the_ version.

        const sectorStore = db.createObjectStore('sectors', {keyPath: 'SectorId'});
        sectorStore.createIndex('name', 'Name');

        const systemStore = db.createObjectStore('systems', {keyPath: 'SystemId'});
        systemStore.createIndex('id', 'SystemNaturalId');
        systemStore.createIndex('name', 'Name');
        systemStore.createIndex('sectorId', 'SectorId');
        systemStore.createIndex('connections', 'Connections.Connection');

        const planetStore = db.createObjectStore('planets', {keyPath: 'PlanetId'});
        planetStore.createIndex('planetId', 'PlanetNaturalId');

        const recipeStore = db.createObjectStore('recipes', {keyPath: 'RecipeName'});
        recipeStore.createIndex('inputs', 'Inputs.Ticker');
        recipeStore.createIndex('outputs', 'Outputs.Ticker');
        recipeStore.createIndex('building', 'BuildingTicker');

        const buildingStore = db.createObjectStore('buildings', {keyPath: 'Ticker'});
        buildingStore.createIndex('expertise', 'Expertise');

        const materialStore = db.createObjectStore('materials', {keyPath: 'MatId'});
        materialStore.createIndex('ticker', 'Ticker');
        materialStore.createIndex('name', 'Name');
        materialStore.createIndex('category', ['CategoryName', 'CategoryId']);

        const cxStore = db.createObjectStore('cx', {keyPath: 'CXDataModelId'});
        cxStore.createIndex('cxTicker', ['MaterialTicker', 'ExchangeCode']);
        cxStore.createIndex('ticker', 'MaterialTicker');
        cxStore.createIndex('cx', 'ExchangeCode');

        const siteStore = db.createObjectStore('sites', {keyPath: 'SiteId'});
        siteStore.createIndex('planetId', 'PlanetId')
        siteStore.createIndex('building', 'Buildings.BuildingTicker')
        siteStore.createIndex('repairs', 'Buildings.RepairMaterials.MaterialTicker')
        siteStore.createIndex('reclaims', 'Buildings.ReclaimableMaterials.MaterialTicker')

        const productionStore = db.createObjectStore('production', {keyPath: 'SiteId'});
        productionStore.createIndex('planetId', 'ProductionLines.PlanetId')
        productionStore.createIndex('input', 'ProductionLines.Orders.Inputs.MaterialId')
        productionStore.createIndex('output', 'ProductionLines.Orders.Outputs.MaterialId')

        const workforceStore = db.createObjectStore('workforce', {keyPath: 'SiteId'});
        workforceStore.createIndex('planetId', 'PlanetId');
        workforceStore.createIndex('type', 'Workforces.WorkforceTypeName');
        workforceStore.createIndex('material', 'Workforces.WorkforceNeeds.MaterialTicker');

        const shipStore = db.createObjectStore('ships', {keyPath: 'ShipId'});
        shipStore.createIndex('store', 'StoreId');
        shipStore.createIndex('registration', 'Registration');
        shipStore.createIndex('name', 'Name');
        shipStore.createIndex('repairs', 'Repairs.MaterialTicker');

        db.createObjectStore('lastUpdated');
      }
    });
    loading = false;
  }
  return db;
};


// const batchSize = 100
// let keys, values, keyRange = null
//
// function fetchMore() {
//   // If there could be more results, fetch them
//   if (keys && values && values.length === batchSize) {
//     // Find keys greater than the last key
//     keyRange = IDBKeyRange.lowerBound(keys.at(-1), true)
//     keys = values = undefined
//     next()
//   }
// }
//
// function next() {
//   store.getAllKeys(keyRange, batchSize).onsuccess = e => {
//     keys = e.target.result
//     fetchMore()
//   }
//   store.getAll(keyRange, batchSize).onsuccess = e => {
//     values = e.target.result
//     fetchMore()
//   }
// }
//
// next()

type DBMapper = <O, T extends NadirDBStoreName>(db: IDBPDatabase<NadirDBSchema>, store: T, rowProcessor: (r: StoreValue<NadirDBSchema, T>) => O, qualifier?: (r:  StoreValue<NadirDBSchema, T>) => boolean) => Promise<O[]>;
export const dbMap: DBMapper = async (db, store, rowProcessor, qualifier) => {
  const tx = db.transaction(store);
  const results: any[] = [];
  (await tx.store.getAll()).forEach(v => {
    if((!qualifier || qualifier(v))) {
      results.push(rowProcessor(v));
    }
  });
  return results;
}
