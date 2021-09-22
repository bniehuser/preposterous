import { IDBPDatabase } from 'idb';
import { DependencyList, useCallback, useEffect } from 'react';
import { NadirDBSchema } from '../db';
import { useDB } from './useDB';

export const useDBEffect = (callback: (db: IDBPDatabase<NadirDBSchema>) => Promise<void>, deps: DependencyList) => {
  const [db] = useDB();
  const cb = useCallback(db => {
    const getIt = async () => {
      await callback(db);
    };
    getIt()
  }, deps); // eslint-disable-line
  // NOTE: this absolutely TRASHES the IDE's ability to enforce dependencies
  // it's a very nice shortcut for db-dependent effects, but the type rules suck

  useEffect(() => {
    if(db) {
      cb(db);
    }
  }, [cb, db])
}
