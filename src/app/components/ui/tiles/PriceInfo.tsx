import React, { FC, useEffect, useState } from 'react';
import { CXListingData, MaterialData } from '../../../datatypes';
import { useDB } from '../../../hooks';
import { camelToTitle } from '../../../util/strings';
import { Icon } from '../Icon';

export const PriceInfo: FC<{listing: CXListingData|string}> = ({listing: propListing}) => {
  const [db] = useDB();
  const [listing, setListing] = useState<CXListingData|undefined>();
  const [mat, setMat] = useState<MaterialData|undefined>();

  useEffect(() => {
    if(db &&typeof propListing === 'string') {
      const getIt = async () => {
        setListing(await db.getFromIndex('cx', 'cxTicker', propListing.split('.') as [string, string]) as CXListingData);
      }
      getIt();
    } else if(propListing) {
      setListing(propListing as CXListingData);
    }
  }, [db, propListing]);

  useEffect(() => {
    if(db && listing) {
      const getIt = async () => {
        setMat(await db.get('materials', listing.MaterialId));
      }
      getIt()
    }
  }, [db, listing]);

  return listing && mat ? (
    <div className={'form'}>
      <div className={'material-title'}>
        <div style={{float: 'left', marginRight: '.2rem'}}><Icon cat={mat.CategoryName} ticker={mat.Ticker}/></div>
        <div className={'material-name'}>{camelToTitle(mat.Name)}</div>
        <div><em>(description?)</em></div>
      </div>
      <div className={'form-component passive'}>
        <label className={''}>Avg</label>
        <div className={'input'}><div className={'static'}>{listing.PriceAverage.toFixed(2)}</div></div>
      </div>
    </div>
  ) : null;
}
