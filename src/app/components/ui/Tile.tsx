import React, { FC, ReactNode, useEffect, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { useDrag } from 'react-dnd';
import { emptyTile, Path, removeTile, splitTile, Tile as TileInfo, TileType } from '../../../features/ui/uiSlice';
import { useAppDispatch } from '../../hooks';
import { getTile } from '../../util/ui';
import { Gear } from './icon/Gear';
import { Picker } from './tiles/Picker';

interface Props {
  tileInfo: TileInfo;
  p: Path;
  i?: number;
}


export const Tile: FC<Props> = React.memo<Props>(({tileInfo, p, i}) => {
  const [tile, setTile] = useState<{ t: string, d: ReactNode, e?: string } | undefined>();
  const [opacity, setOpacity] = useState<number>(1);
  const dispatch = useAppDispatch();

  const [{isDragging}, drag, dragPreview] = useDrag(() => ({
    type: 'TILE',
    item: [p, tileInfo, i],
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    })
  }), [p, tileInfo, i]);


  useEffect(() => {
    getTile(tileInfo, p, i).then(t => {
      if (t.e) {
        setTile({
          t: '',
          d: <Picker s={{input: `${TileType[tileInfo.c]} ${tileInfo.a || ''}`.trim(), error: t.e}} p={p} i={i}/>
        });
      } else {
        setTile(t);
      }
    });
  }, [i, p, tileInfo])

  return tile ? <article className={'tile'} style={{opacity:isDragging ? .5 : opacity}} ref={dragPreview}>
    <section className={'frame'}>
      {tile.t && <div className={'header'} ref={drag} onMouseDown={() => setOpacity(.5)} onDragStart={() => setTimeout(() => setOpacity(1),0)}>
          <div className={'title'}>{tile.t}</div>
      </div>}
      <div className={'body'}>
        <div className={'anchor'}><Scrollbars>{tile.d}</Scrollbars></div>
      </div>
      <div className={'tile-controls'}>
        <div className={'control-container'}>
          <div className={'icon'}>
            <button className={'control'}><Gear/></button>
          </div>
          <div className={'tile-control-controls'}>
            <div className={'splitControls'}>
              <button className={'control'} onClick={() => dispatch(splitTile([p, 'v', i]))}>–</button>
              <button className={'control'} onClick={() => dispatch(splitTile([p, 'h', i]))}>|</button>
            </div>
            <button className={'control'} onClick={() => dispatch(removeTile([p, i]))}>x</button>
            <button className={'control'} onClick={() => dispatch(emptyTile([p, i]))}>:</button>
          </div>
        </div>
      </div>
    </section>
  </article> : null;
})
