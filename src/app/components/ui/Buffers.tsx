import React, { FC, useMemo } from 'react';
import { useAppSelector } from '../../hooks';
import { Buffer } from './Buffer';

export const Buffers: FC = () => {
  const { buffers } = useAppSelector(s => s.ui);
  const bufferMap = useMemo(() => buffers.map((b, i) => <Buffer key={b.i} bufferInfo={b} z={i}/>), [buffers]);
  return (
    <div style={{zIndex:9}}>
      {bufferMap}
    </div>
  );
}
