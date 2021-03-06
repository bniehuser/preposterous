import moment from 'moment';
import React, { FC, useState } from 'react';
import { addBuffer } from '../../../features/ui/uiSlice';
import { NadirDBStoreName } from '../../db';
import { useAppDispatch, useDB } from '../../hooks';
import { useTimedRender } from '../../hooks/useTimedRender';

type DataAgeMap = {
  [k: string]: number;
}

export const Foot: FC = () => {
  const [, update] = useDB(async db => {
    const map: DataAgeMap = {};
    const updKeys = await db.getAllKeys('lastUpdated');
    const newMap = await updKeys.reduce(async (a, c) => {
      const map = await a;
      map[c] = await db.get('lastUpdated', c) || 0;
      return map;
    }, Promise.resolve(map))
    setLoadStatus(newMap)
  });
  useTimedRender(10000);
  const [loadStatus, setLoadStatus] = useState<DataAgeMap>({});
  const dispatch = useAppDispatch();
  return (
    <div className={'foot'}>
      <div>
        <div className={'foot-item create'} onClick={() => dispatch(addBuffer())}>
          NEW BFR
        </div>
        {Object.keys(loadStatus).map(l => (
          <div className={'foot-item create'} key={l} onClick={() => update(l as NadirDBStoreName, true)}>
            {l}: {moment(loadStatus[l]).fromNow()}
          </div>
        ))}
      </div>
      <div>
        <div className={'foot-item create'}>
          REFRESH ALL
        </div>
      </div>
    </div>
  );
}
