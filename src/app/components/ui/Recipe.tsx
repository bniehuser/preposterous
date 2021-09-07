import moment from 'moment';
import 'moment-duration-format';
import React, { FC, memo, useEffect, useState } from 'react';
import { BuildingData, BuildingRecipe, CommodityAmount, MaterialData } from '../../datatypes';
import { Recipe_MinimalInput, Recipe_MinimalRecipe } from '../../../services/openapi';
import { useDB } from '../../hooks';
import { Icon } from './Icon';

interface Props {
  recipe: Recipe_MinimalRecipe|BuildingRecipe,
  size?: number
}

export const Recipe: FC<Props> = memo(({recipe, size = 36}) => {
  // TODO: this does a LOT of DB lookups that are likely TOTALLY UNNECESSARY
  const [inputs, setInputs] = useState<{count: number, data: MaterialData}[]>([]);
  const [outputs, setOutputs] = useState<{count: number, data: MaterialData}[]>([]);
  const [building, setBuilding] = useState<BuildingData|undefined>(undefined);
  const [db] = useDB();
  useEffect(() => {
    if(db) {
      const updater = async () => {
        const bt = (recipe as Recipe_MinimalRecipe).BuildingTicker;
        if(bt) {
          setBuilding(await db.get('buildings', bt));
        }
        if (recipe.Inputs) {
          const newInputs = [];
          for (let i = 0; i < recipe.Inputs.length; i++) {
            let count: number|undefined;
            let ticker: string|undefined;
            if ((recipe.Inputs[i] as Recipe_MinimalInput).Ticker) {
              count = (recipe.Inputs[i] as Recipe_MinimalInput).Amount;
              ticker = (recipe.Inputs[i] as Recipe_MinimalInput).Ticker;
            } else {
              count = (recipe.Inputs[i] as CommodityAmount).Amount;
              ticker = (recipe.Inputs[i] as CommodityAmount).CommodityTicker;
            }
            const data = ticker ? await db.getFromIndex('materials', 'ticker', ticker) : undefined;
            if (count && data) {
              newInputs.push({count, data})
            }
          }
          setInputs(newInputs);
        }
        if (recipe.Outputs) {
          const newOutputs = [];
          for (let i = 0; i < recipe.Outputs.length; i++) {
            let count: number|undefined;
            let ticker: string|undefined;
            if ((recipe.Outputs[i] as Recipe_MinimalInput).Ticker) {
              count = (recipe.Outputs[i] as Recipe_MinimalInput).Amount;
              ticker = (recipe.Outputs[i] as Recipe_MinimalInput).Ticker;
            } else {
              count = (recipe.Outputs[i] as CommodityAmount).Amount;
              ticker = (recipe.Outputs[i] as CommodityAmount).CommodityTicker;
            }
            const data = ticker ? await db.getFromIndex('materials', 'ticker', ticker) : undefined;
            if (count && data) {
              newOutputs.push({count, data})
            }
          }
          setOutputs(newOutputs);
        }
      };
      updater();
    }
  }, [db, recipe, size])

  // let's recognize that there are a lot of presentation options available; e.g. showing title or weight/vol etc.
  const useMs = (recipe as Recipe_MinimalRecipe).TimeMs ? (recipe as Recipe_MinimalRecipe).TimeMs : (recipe as BuildingRecipe).DurationMs;

  return (
    <div className={'recipe'}>
      <div className={'recipe-inputs'}>
        {!inputs.length && <span className={'recipe-arrow'}>No Inputs</span>}
        {inputs.map(m => <Icon key={m.data.Ticker} size={size} cat={m.data.CategoryName} ticker={m.data.Ticker} inset={m.count}/>)}
      </div>
      {building && (
        <div className={'recipe-building'}>
          <span className={'recipe-at'} style={{fontSize:(size/3)+'px'}}>@</span>
          <Icon size={size} cat={'bui'} ticker={building.Ticker} />
          <span className={'recipe-time'} style={{width: size+'px'}}>
            {moment.duration(useMs).format("d[d] h[h] m[m] s[s]", { trim: 'both' })}
          </span>
        </div>
      )}
      <div className={'recipe-outputs'}>
        <span className={'recipe-arrow'} style={{fontSize:(size/3)+'px'}}>⇨</span>
        {outputs.map(m => <Icon key={m.data.Ticker} size={size} cat={m.data.CategoryName} ticker={m.data.Ticker} inset={m.count}/>)}
      </div>
      {!building && (
        <div className={'recipe-duration'}>
          <span className={'recipe-time'} style={{width: size+'px'}}>
            {moment.duration(useMs).format("d[d] h[h] m[m] s[s]", { trim: 'both' })}
          </span>
        </div>
      )}
    </div>
  );
})
