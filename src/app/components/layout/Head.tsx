import React, { FC } from 'react';

export const Head: FC = () => {
  return (
    <div className={'head-container'}>
      <div>
        <div className={'head-item'}>
          <span className={'label'}>Might be a screen switcher?  Maybe not?</span>
          <div className={'indicator indicatorSecondary'}/>
        </div>
      </div>
      <div>
        <div className={'head-item'}>
          <span className={'label'}>Login</span>
          <div className={'indicator indicatorSecondaryPulse'}/>
        </div>
      </div>
    </div>
  );
}
