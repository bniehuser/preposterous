import React, { FC } from 'react';

interface Props {
  loadingMessage?: string,
  loadingPercent?: number,
}

export const Update: FC<Props> = ({loadingMessage, loadingPercent}) => {
  return (
    <div className={'overlay progress'}>
      <div className={'message'}>
        <div>{loadingMessage}</div>
        <div>{loadingPercent}%</div>
      </div>
    </div>
  );
}
