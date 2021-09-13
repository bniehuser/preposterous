import React, { FC, useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { assignTile, Path, Tile as TileInfo, TileNode as TileNodeInfo } from '../../../features/ui/uiSlice';
import { useAppDispatch } from '../../hooks';
import { mouseEventSubscribe } from '../../util/mouse';
import { Tile } from './Tile';

interface Props {
  nodeInfo: TileNodeInfo;
  p: Path;
  i?: number;
}

export const TileNode: FC<Props> = React.memo<Props>(({p, nodeInfo, i}) => {
  const dim = nodeInfo.o === 'h' ? 'width' : 'height';
  const classes = classNames('node', {'horizontal': nodeInfo.o === 'h', 'vertical': nodeInfo.o === 'v'});
  const r = [nodeInfo.r, 1-nodeInfo.r];
  const dispatch = useAppDispatch();
  const ref = React.createRef<HTMLDivElement>();

  const paths: [Path,Path] = useMemo(() => {
    if(p) return [0, 1].map(i => [...p, i]) as [Path, Path];
    return [[],[]];
  },  [p])

  const resize = (e: React.MouseEvent) => {
    e.preventDefault();
    const bb = ref.current?.getBoundingClientRect();
    if(bb) {
      mouseEventSubscribe(m => {
        if (nodeInfo.o === 'h') {
          dispatch(assignTile([p, {...nodeInfo, r: (m.clientX - bb.left) / (bb.right - bb.left)}, i]));
        } else {
          dispatch(assignTile([p, {...nodeInfo, r: (m.clientY - bb.top) / (bb.bottom - bb.top)}, i]));
        }
      }, () => undefined);
    }
  }

  return (
    <div ref={ref} className={classes}>
      {nodeInfo.c.map((c, idx) => <div key={idx} style={{[dim]: (r[idx]*100)+'%'}} className={'child'}>
        {typeof (c as any).c === 'number' ? <Tile i={i} p={paths[i as 0|1]} tileInfo={c as TileInfo}/> : <TileNode i={i} p={paths[i as 0|1]} nodeInfo={c as TileNodeInfo}/>}
      </div>)}
      <div className={`shim-${nodeInfo.o}`} style={{[nodeInfo.o === 'h'?'left':'top']:(nodeInfo.r * 100)+'%'}}><div className={'handle'} onMouseDown={resize}/></div>
    </div>
  );
});
