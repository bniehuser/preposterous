import React, { FC } from 'react';
import { useAppSelector } from '../../../hooks';
import { Icon } from '../Icon';

export const TestTile: FC = () => {
  const { token, expires } = useAppSelector(s => s.auth);
  return (
    <section className={'content'}>
      <p>No really this is a test: {token} {expires}</p>
      <div style={{display: 'flex', flexWrap: 'wrap'}}>
        <Icon cat={'agr'} ticker={'RCO'}/>
        <Icon cat={'conm'} ticker={'MCG'}/>
        <Icon cat={'conp'} ticker={'TRU'}/>
        <Icon cat={'conf'} ticker={'BSE'}/>
        <Icon cat={'conb'} ticker={'RAT'} inset={123}/>
        <Icon cat={'conl'} ticker={'PWO'}/>
        <Icon cat={'pla'} ticker={'PG'}/>
        <Icon size={32} cat={'chm'} ticker={'FLX'}/>
        <Icon size={28} cat={'bui'} ticker={'REF'}/>
      </div>
    </section>
  );
}
