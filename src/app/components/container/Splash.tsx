import React, { FC, useEffect, useState } from 'react';

interface Props {
  loadingMessage?: string,
  loadingPercent?: number,
}

const b = () => Math.random() >= .5;

export const Splash: FC<Props> = ({loadingMessage, loadingPercent}) => {
  const [load, setLoad] = useState<boolean[]>([
    b(), b(), b(), b(), b(), b(), b(),
  ])
  useEffect(() => {
    setInterval(() => {
      setLoad([b(), b(), b(), b(), b(), b(), b()])
    }, 200);
  }, []);
  return (
    <div className={'splash-container'}>
      <div className={'splash-title'}>Welcome to NADIR!</div>
      <div className={'splash-text'}>Please stand by, initializing NADIR console</div>
      <div className={'splash-loader'}>
        <div className={'item-container'}>
          <div className={`item-indicator ${load[0] && 'indicator-enabled'}`}/>
          <div className={'splash-item item-value'}>
            Sectors
          </div>
        </div>
        <div className={'item-container'}>
          <div className={`item-indicator ${load[1] && 'indicator-enabled'}`}/>
          <div className={'splash-item item-value'}>
            Systems
          </div>
        </div>
        <div className={'item-container'}>
          <div className={`item-indicator ${load[2] && 'indicator-enabled'}`}/>
          <div className={'splash-item item-value'}>
            Planets
          </div>
        </div>
        <div className={'item-container'}>
          <div className={`item-indicator ${load[3] && 'indicator-enabled'}`}/>
          <div className={'splash-item item-value'}>
            Materials
          </div>
        </div>
        <div className={'item-container'}>
          <div className={`item-indicator ${load[4] && 'indicator-enabled'}`}/>
          <div className={'splash-item item-value'}>
            Buildings
          </div>
        </div>
        <div className={'item-container'}>
          <div className={`item-indicator ${load[5] && 'indicator-enabled'}`}/>
          <div className={'splash-item item-value'}>
            Recipes
          </div>
        </div>
        <div className={'item-container'}>
          <div className={`item-indicator ${load[6] && 'indicator-enabled'}`}/>
          <div className={'splash-item item-value'}>
            CX Data
          </div>
        </div>
      </div>
    </div>
  );
}
