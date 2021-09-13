import React, { FC, useEffect, useState } from 'react';
import { BuildingData, MaterialData } from '../../../datatypes';
import { useDB } from '../../../hooks';
import { camelToTitle, upperSnakeToTitle } from '../../../util/strings';
import { Icon } from '../Icon';
import { Recipe } from '../Recipe';

export const BuildingInfo: FC<{building: BuildingData|string}> = ({building: propBuilding}) => {
  const [db] = useDB();
  const [building, setBuilding] = useState<BuildingData|undefined>()
  const [costs, setCosts] = useState<Array<{count: number, data: MaterialData}>>([])

  useEffect(() => {
    if(db &&typeof propBuilding === 'string') {
      const getIt = async () => {
        setBuilding(await db.get('buildings', propBuilding));
      }
      getIt();
    } else if(propBuilding) {
      setBuilding(propBuilding as BuildingData);
    }
  }, [db, propBuilding]);

  useEffect(() => {
    if(db && building) {
      const getIt = async () => {
        const newCosts: Array<{count: number, data: MaterialData}> = [];
        for (let i = 0; i < building.BuildingCosts.length; i++) {
          const bc = building.BuildingCosts[i];
          const data = await db.getFromIndex('materials', 'ticker', bc.CommodityTicker);
          if (data) {
            newCosts.push({count: bc.Amount, data});
          }
        }
        setCosts(newCosts);
      }
      getIt()
    }
  }, [db, building]);

  return building ? (
    <div className={'building-info form'}>
      <div className={'building-title'}>
        <div style={{float: 'left', marginRight: '.2rem'}}><Icon cat={'bui'} ticker={building.Ticker}/></div>
        <div className={'building-name'}>{camelToTitle(building.Name)}</div>
        <div>{upperSnakeToTitle(building.Expertise || '')} <em>(description?)</em></div>
      </div>
      <div className={'form-component passive'}>
        <label className={''}>Workforces</label>
        <div className={'input'}><div className={'static'}>{['Pioneers','Settlers','Technicians', 'Engineers', 'Scientists'].map(w => {
          const n = building[w as keyof BuildingData];
          return n > 0 && <div key={w}><span className={'capacity-title'}>{w}</span><span className={'capacity-value'}>{n}</span></div>;
        })}</div></div>
      </div>
      <div className={'form-component passive'}>
        <label className={''}>Expertise</label>
        <div className={'input'}><div className={'static'}>{upperSnakeToTitle(building.Expertise || '')}</div></div>
      </div>
      <div className={'form-component passive'}>
        <label className={''}>Area Cost</label>
        <div className={'input'}><div className={'static'}>{building.AreaCost}</div></div>
      </div>
      <div className={'form-component passive'}>
        <label className={''}>Building Costs</label>
        <div className={'input'}><div className={'static'}><div style={{display:'flex',flexDirection:'row'}}>{costs.map(c => (
          <div key={c.data.Ticker} style={{margin:'2px'}}><Icon key={c.data.Ticker} size={33} cat={c.data.CategoryName} ticker={c.data.Ticker} inset={c.count}/></div>
        ))}</div></div></div>
      </div>
      <div className={'form-component passive'}>
        <label className={''}>Products</label>
        <div className={'input'}><div className={'static'}>{building.Recipes.map(r => (
            <Recipe key={r.RecipeName} size={33} recipe={r}/>
        ))}</div></div>
      </div>
    </div>
  ) : null;
}
