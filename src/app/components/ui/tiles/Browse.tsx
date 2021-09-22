import React, { FC, useEffect, useState } from 'react';
import { BuildingData, MaterialData } from '../../../datatypes';
import { db } from '../../../db';
import { camelToTitle } from '../../../util/strings';
import { BuildingInfo } from './BuildingInfo';
import { MaterialInfo } from './MaterialInfo';

interface Props {
  m: 'BUI' | 'MAT';
  i?: string;
}

export const Browse: FC<Props> = ({m, i}) => {
  const [values, setValues] = useState<(BuildingData | MaterialData)[]>([]);
  const [value, setValue] = useState<BuildingData | MaterialData | undefined>(undefined);
  const [mode] = useState(m); // TODO: implement mode switcher

  useEffect(() => {
    const doIt = async () => {
      setValue(undefined);
      let newVals: (BuildingData | MaterialData)[] = [];
      if (mode === 'BUI') {
        newVals = await db.getAll('buildings');
      } else if (mode === 'MAT') {
        newVals = await db.getAll('materials');
        newVals.sort((a, b) => a.Ticker > b.Ticker ? 1 : -1)
      }
      setValues(newVals);
      if(i) {
        setValue(newVals.find(v => v.Ticker === i))
      }
    }
    doIt();
  }, [i, mode])

  return (
    <>
      <form className={'form'}>
        <div className={'form-component active'}>
          <label className={'active'}>{mode === 'BUI' ? 'Building' : 'Material'}</label>
          <div className={'input'}>
            <select value={value?.Ticker}
                    onChange={e => setValue(values.find(v => v.Ticker === e.target.value))}>
              {values.map(v => <option key={v.Ticker}
                                       value={v.Ticker}>({v.Ticker}) {camelToTitle(v.Name)}</option>)}
            </select>
          </div>
        </div>
      </form>
      {mode === 'BUI' && value && <BuildingInfo building={value as BuildingData}/>}
      {mode === 'MAT' && value && <MaterialInfo material={value as MaterialData}/>}
    </>
  );
}
