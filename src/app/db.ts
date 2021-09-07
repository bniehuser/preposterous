import * as idb from 'idb';
import { Recipe_MinimalRecipe } from '../services/openapi';
import { BuildingData, MaterialData, PlanetData } from './datatypes';

export type NadirDBStoreName = 'planets'|'recipes'|'buildings'|'materials';

export interface NadirDB extends idb.DBSchema {
  planets: {
    key: string;
    value: PlanetData;
    indexes: { 'planetId': string };
  };
  recipes: {
    key: string;
    value: Recipe_MinimalRecipe;
    indexes: {
      'inputs': string;
      'outputs': string;
      'building': string;
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
  lastUpdated: {
    key: NadirDBStoreName;
    value: number;
  };
}

export let db: idb.IDBPDatabase<NadirDB>;
let loading = false;

export const initDB = async () => {
  if(!db && !loading) {
    console.log('going to open db...');
    loading = true;
    db = await idb.openDB<NadirDB>('nadir', 1, {
      upgrade(db) {
        // NOTE: we don't care about old or new versions here.  for now, this is _the_ version.
        // TODO: get actual schema and add desired indices

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

        db.createObjectStore('lastUpdated');
      }
    });
    loading = false;
  }
  return db;
};
