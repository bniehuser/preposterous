import React, { FC } from 'react';
import { useAppSelector } from '../../hooks';

export const Update: FC = () => {
  const {loadingMessage, loadingPercent} = useAppSelector(s => s.gameData)
  return (
    <div className={'overlay progress'}>
      <div className={'message'}>
        {loadingMessage}
        {loadingPercent}
      </div>
    </div>
  );
}
