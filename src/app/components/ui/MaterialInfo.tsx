import React, { FC, useEffect, useState } from 'react';
import { Recipe_MinimalInput, Recipe_MinimalRecipe } from '../../../services/openapi';
import { BuildingData, MaterialData } from '../../datatypes';
import { useDB } from '../../hooks';
import { camelToTitle, toTitle, upperSnakeToTitle } from '../../util/strings';
import { Icon } from './Icon';
import { Recipe } from './Recipe';

export const MaterialInfo: FC<{material: MaterialData|string}> = ({material: propMaterial}) => {
  const [db] = useDB();
  const [material, setMaterial] = useState<MaterialData|undefined>()
  const [makers, setMakers] = useState<Recipe_MinimalRecipe[]>([])
  const [products, setProducts] = useState<Recipe_MinimalRecipe[]>([])
  const [builders, setBuilders] = useState<BuildingData[]>([])
  const [matCache, setMatCache] = useState<{[k: string]: MaterialData}>({});

  useEffect(() => {
    if(db &&typeof propMaterial === 'string') {
      const getIt = async () => {
        setMaterial(await db.get('materials', propMaterial));
      }
      getIt();
    } else if(propMaterial) {
      setMaterial(propMaterial as MaterialData);
    }
  }, [db, propMaterial]);

  useEffect(() => {
    if(db && material) {
      const getIt = async () => {
        const rd = await db.getAll('recipes');
        setMakers(rd.filter(r => r.Outputs && r.Outputs.some(i => (i as Recipe_MinimalInput).Ticker === material.Ticker)));
        setProducts(rd.filter(r => r.Inputs && r.Inputs.some(i => i.Ticker === material.Ticker)));
        const bd = await db.getAll('buildings');
        const newBuilders = bd.filter(b => b.BuildingCosts.some(c => c.CommodityTicker === material.Ticker));
        const newMatCache: {[k: string]: MaterialData} = {};
        for(let i=0; i<newBuilders.length; i++) {
          const nb = newBuilders[i]
          for(let j=0; j<nb.BuildingCosts.length; j++) {
            const c = nb.BuildingCosts[j];
            const m = await db.getFromIndex('materials', 'ticker', c.CommodityTicker);
            if (m) {
              newMatCache[c.CommodityTicker] = m;
            }
          }
        }
        setBuilders(newBuilders);
        setMatCache(newMatCache);
      }
      getIt()
    }
  }, [db, material]);

  return material ? (
    <div className={'material-info form'}>
      <div className={'material-title'}>
        <div style={{float: 'left', marginRight: '.2rem'}}><Icon cat={'bui'} ticker={material.Ticker}/></div>
        <div className={'material-name'}>{camelToTitle(material.Name)}</div>
        <div><em>(description?)</em></div>
      </div>
      <div className={'form-component passive'}>
        <label className={''}>Ticker</label>
        <div className={'input'}><div className={'static'}>{material.Ticker}</div></div>
      </div>
      <div className={'form-component passive'}>
        <label className={''}>Category</label>
        <div className={'input'}><div className={'static'}>{toTitle(material.CategoryName)}</div></div>
      </div>
      <div className={'form-component passive'}>
        <label className={''}>Weight</label>
        <div className={'input'}><div className={'static'}>{Math.round(material.Weight * 1000) / 1000 + ' t'}</div></div>
      </div>
      <div className={'form-component passive'}>
        <label className={''}>Volume</label>
        <div className={'input'}><div className={'static'}>{Math.round(material.Volume * 1000) / 1000 + ' m3'}</div></div>
      </div>
      <div className={'form-component passive'}>
        <label className={''}>Natural resource</label>
        <div className={'input'}><div className={'static'}>{makers.length ? 'no' : 'yes'}</div></div>
      </div>
      {makers.length > 0 && (
        <div className={'form-component passive'}>
          <label className={''}>Production</label>
          <div className={'input'}><div className={'static'}>{makers.map(r => (
              <Recipe key={r.RecipeName} size={33} recipe={r}/>
          ))}</div></div>
        </div>
      )}
      {products.length > 0 && (
        <div className={'form-component passive'}>
          <label className={''}>Wrought Products</label>
          <div className={'input'}><div className={'static'}>{products.map(r => (
            <Recipe key={r.RecipeName} size={33} recipe={r}/>
          ))}</div></div>
        </div>
      )}
      {builders.length > 0 && (
        <div className={'form-component passive'}>
          <label className={''}>Building material</label>
          <div className={'input'}><div className={'static'}>{builders.map(b => (
            <div className={'recipe'}>
              <div className={'recipe-inputs'}>
                {b.BuildingCosts.map(c => {
                  const m = matCache[c.CommodityTicker];
                  return m && <Icon key={m.Ticker} size={33} cat={m.CategoryName} ticker={m.Ticker} inset={c.Amount}/>;
                })}
              </div>
              <div className={'recipe-outputs'}>
                <span className={'recipe-arrow'} style={{fontSize:'11px'}}>⇨</span>
                <Icon key={b.Ticker} cat={'bui'} ticker={b.Ticker} size={33}/>
              </div>
            </div>
          ))}</div></div>
        </div>
      )}
    </div>
  ) : null;
}
