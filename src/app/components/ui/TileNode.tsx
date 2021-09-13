import React, { FC, ReactNode, useState } from 'react';
import classNames from 'classnames';
import { assignTile, Path, Tile as TileInfo, TileNode as TileNodeInfo } from '../../../features/ui/uiSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { mouseEventSubscribe } from '../../util/mouse';
import { Tile } from './Tile';

interface Props {
  nodeInfo: TileNodeInfo;
  p: Path;
  i?: number;
}

export const TileNode: FC<Props> = ({p, nodeInfo, i}) => {
  const dim = nodeInfo.o === 'h' ? 'width' : 'height';
  const classes = classNames('node', {'horizontal': nodeInfo.o === 'h', 'vertical': nodeInfo.o === 'v'});
  const r = [nodeInfo.r, 1-nodeInfo.r];
  const dispatch = useAppDispatch();

  const resize = (e: React.MouseEvent) => {
    e.preventDefault();
    const c = document.getElementById('t'+i+'_'+p.join('_')) as HTMLDivElement;
    const bb = c.getBoundingClientRect();
    mouseEventSubscribe(m => {
      if (nodeInfo.o === 'h') {
        dispatch(assignTile([p, {...nodeInfo, r: (m.clientX-bb.left)/(bb.right-bb.left)}, i]));
      } else {
        dispatch(assignTile([p, {...nodeInfo, r: (m.clientY-bb.top)/(bb.bottom-bb.top)}, i]));
      }

    }, () => undefined);
  }

  return (
    <div className={classes} id={'t'+i+'_'+p.join('_')}>
      {nodeInfo.c.map((c, idx) => <div key={idx} style={{[dim]: (r[idx]*100)+'%'}} className={'child'}>
        {typeof (c as any).c === 'number' ? <Tile i={i} p={[...p, idx as 0|1]} tileInfo={c as TileInfo}/> : <TileNode i={i} p={[...p, idx as 0|1]} nodeInfo={c as TileNodeInfo}/>}
      </div>)}
      <div className={`shim-${nodeInfo.o}`} style={{[nodeInfo.o === 'h'?'left':'top']:(nodeInfo.r * 100)+'%'}}><div className={'handle'} onMouseDown={resize}/></div>
    </div>
  );
}
