import React, { FC } from 'react';

interface Props {
  ticker?: string;
  cat?: string;
  size?: number;
  inset?: string|number;
}

export const Icon: FC<Props> = ({
  ticker = 'XXX',
  cat = 'bui',
  inset,
  size = 48,
  children
}) => {
  return (
    <div className={`icon--${cat}`} style={{width:`${size}px`,height:`${size}px`,fontSize:`${size*.33}px`}}>
      {ticker}
      {inset && <span className={'inset'}>{inset}</span>}
    </div>
  );
}
