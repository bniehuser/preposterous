import React, { FC, useEffect, useState } from 'react';
import { Recipe_MinimalInput, Recipe_MinimalRecipe } from '../../../../services/openapi';
import { BuildingData, CXListingData, MaterialData } from '../../../datatypes';
import { useDB } from '../../../hooks';
import { camelToTitle, toTitle } from '../../../util/strings';
import { Icon } from '../Icon';
import { Recipe } from '../Recipe';

export const MaterialInfo: FC<{ material: MaterialData | string }> = ({material: propMaterial}) => {
  const [db] = useDB();
  const [material, setMaterial] = useState<MaterialData | undefined>()
  const [makers, setMakers] = useState<Recipe_MinimalRecipe[]>([])
  const [products, setProducts] = useState<Recipe_MinimalRecipe[]>([])
  const [builders, setBuilders] = useState<BuildingData[]>([])
  const [matCache, setMatCache] = useState<{ [k: string]: MaterialData }>({});
  const [listings, setListings] = useState<CXListingData[]>([]);

  useEffect(() => {
    if (db && typeof propMaterial === 'string') {
      const getIt = async () => {
        setMaterial(await db.get('materials', propMaterial));
      }
      getIt();
    } else if (propMaterial) {
      setMaterial(propMaterial as MaterialData);
    }
  }, [db, propMaterial]);

  useEffect(() => {
    if (db && material) {
      const getIt = async () => {
        const rd = await db.getAll('recipes');
        setMakers(rd.filter(r => r.Outputs && r.Outputs.some(i => (i as Recipe_MinimalInput).Ticker === material.Ticker)));
        setProducts(rd.filter(r => r.Inputs && r.Inputs.some(i => i.Ticker === material.Ticker)));
        const bd = await db.getAll('buildings');
        const newBuilders = bd.filter(b => b.BuildingCosts.some(c => c.CommodityTicker === material.Ticker));
        const newMatCache: { [k: string]: MaterialData } = {};
        for (let i = 0; i < newBuilders.length; i++) {
          const nb = newBuilders[i]
          for (let j = 0; j < nb.BuildingCosts.length; j++) {
            const c = nb.BuildingCosts[j];
            const m = await db.getFromIndex('materials', 'ticker', c.CommodityTicker);
            if (m) {
              newMatCache[c.CommodityTicker] = m;
            }
          }
        }
        const newListings = await db.getAllFromIndex('cx', 'ticker', material.Ticker);
        setBuilders(newBuilders);
        setMatCache(newMatCache);
        setListings(newListings);
      }
      getIt()
    }
  }, [db, material]);

  return material ? (
    <div className={'material-info form'}>
      <div className={'material-title'}>
        <div style={{float: 'left', marginRight: '.2rem'}}><Icon cat={material.CategoryName} ticker={material.Ticker}/></div>
        <div className={'material-name'}>{camelToTitle(material.Name)}</div>
        <div><em>(description?)</em></div>
      </div>
      <div className={'tile-break'}/>
      <div className={'tile-subsection'}>
      <table className={'table'}>
        <thead>
        <tr>
          <th>Exchange</th>
          <th>Price</th>
          <th>Ask</th>
          <th>Bid</th>
          <th>Supply</th>
          <th>Demand</th>
        </tr>
        </thead>
        <tbody>
        {listings.map((l, i) => (
          <tr key={i}>
            <td className={l.ExchangeCode}><strong>{l.ExchangeCode}</strong></td>
            {l.Previous && <td className={'number'}>
              <span className={'text-bright'}>
              {l.Price.toFixed(2)}</span>
              <span style={{textAlign:'initial', display:'inline-block', minWidth:'28px', paddingLeft:'4px'}}>{l.Currency}</span>
              <span style={{minWidth:'12px', display:'inline-block', textAlign:'center'}}>
                {l.Previous > l.Price && <span className={'text-danger'}>▼</span>}
                {l.Previous < l.Price && <span className={'text-success'}>▲</span>}
                {l.Previous === l.Price && <span>▸</span>}
              </span>
            </td>}
            {!l.Previous && <td className={'number'}>--<span style={{textAlign:'initial', display:'inline-block', minWidth:'40px', paddingLeft:'4px'}}>{l.Currency}</span></td>}
            <td className={'number'}>{l.Ask ? l.Ask.toFixed(2) : '--'}</td>
            <td className={'number'}>{l.Bid ? l.Bid.toFixed(2) : '--'}</td>
            <td className={'number'}>{l.Supply}</td>
            <td className={'number'}>{l.Demand}</td>
          </tr>
        ))}
        </tbody>
      </table>
      </div>
      <div className={'stack-horiz tile-subsection'}>
      <div className={'form-component passive'}>
        <label className={''}>Ticker</label>
        <div className={'input'}>
          <div className={'static'}>{material.Ticker}</div>
        </div>
      </div>
      <div className={'form-component passive'}>
        <label className={''}>Category</label>
        <div className={'input'}>
          <div className={'static'}>{toTitle(material.CategoryName)}</div>
        </div>
      </div>
      <div className={'form-component passive'}>
        <label className={''}>Weight</label>
        <div className={'input'}>
          <div className={'static'}>{Math.round(material.Weight * 1000) / 1000 + ' t'}</div>
        </div>
      </div>
      <div className={'form-component passive'}>
        <label className={''}>Volume</label>
        <div className={'input'}>
          <div className={'static'}>{Math.round(material.Volume * 1000) / 1000 + ' m3'}</div>
        </div>
      </div>
      <div className={'form-component passive'}>
        <label className={''}>Natural resource</label>
        <div className={'input'}>
          <div className={'static'}>{makers.length ? 'no' : 'yes'}</div>
        </div>
      </div>
      </div>
      <div className={'tile-break'}/>
      {makers.length > 0 && (
        <div key={'makers'} className={'form-component passive'}>
          <label className={''}>Production</label>
          <div className={'input'}>
            <div className={'static'}>{makers.map((r, i) => (
              <Recipe key={i} size={33} recipe={r}/>
            ))}</div>
          </div>
        </div>
      )}
      {products.length > 0 && (
        <div key={'products'} className={'form-component passive'}>
          <label className={''}>Wrought Products</label>
          <div className={'input'}>
            <div className={'static'}>{products.map((r, i) => (
              <Recipe key={i} size={33} recipe={r}/>
            ))}</div>
          </div>
        </div>
      )}
      {builders.length > 0 && (
        <div key={'builders'} className={'form-component passive'}>
          <label className={''}>Building material</label>
          <div className={'input'}>
            <div className={'static'}>{builders.map(b => (
              <div key={b.Ticker} className={'recipe'}>
                <div className={'recipe-inputs'}>
                  {b.BuildingCosts.map((c, i) => {
                    const m = matCache[c.CommodityTicker];
                    return m &&
                        <Icon key={i} size={33} cat={m.CategoryName} ticker={m.Ticker} inset={c.Amount}/>;
                  })}
                </div>
                <div className={'recipe-outputs'}>
                  <span className={'recipe-arrow'} style={{fontSize: '11px'}}>⇨</span>
                  <Icon key={b.Ticker} cat={'bui'} ticker={b.Ticker} size={33}/>
                </div>
              </div>
            ))}</div>
          </div>
        </div>
      )}
    </div>
  ) : null;
}
