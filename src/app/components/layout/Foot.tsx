import React, { FC } from 'react';

export const Foot: FC = () => {
  return (
    <div className={'foot'}>
      <div>
        <div className={'foot-item create'}>
          Planets: 2 days
        </div>
        <div className={'foot-item create'}>
          Recipes: 2 days
        </div>
        <div className={'foot-item create'}>
          CX: 2 days
        </div>
      </div>
      <div>
        <div className={'foot-item create'}>
          REFRESH ALL
        </div>
      </div>
    </div>
  );
}
