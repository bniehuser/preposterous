import React, { FC, useEffect, useState } from 'react';
import { useDrag } from 'react-dnd';
import {
  Tile as TileInfo,
  TileNode as TileNodeInfo,
  Buffer as BufferInfo,
  removeBuffer,
  updateBuffer,
  bufferToTop
} from '../../../features/ui/uiSlice';
import { useAppDispatch } from '../../hooks';
import { mouseEventSubscribe } from '../../util/mouse';
import { Tile } from './Tile';
import { TileNode } from './TileNode';

interface Props {
  bufferInfo: BufferInfo;
  z: number;
}

export const Buffer: FC<Props> = React.memo<Props>(({bufferInfo, z}) => {
  const dispatch = useAppDispatch();
  const [[l, t, w, h], setBox] = useState<[number, number, number, number]>(bufferInfo.b);
  const [pathRef] = useState([]);
  useEffect(() => {
    console.log('new buffer info?');
    setBox(bufferInfo.b);
  }, [bufferInfo.b]);

  const resize = (e: React.MouseEvent, t: 'h'|'v'|'b') => {
    e.preventDefault();
    const c = document.getElementById(`buffer_${bufferInfo.i}`) as HTMLDivElement;
    const bb = c.getBoundingClientRect();
    mouseEventSubscribe(m => {
      dispatch(updateBuffer([bufferInfo.i, {b:[
        bufferInfo.b[0],
        bufferInfo.b[1],
        t === 'v' ? bufferInfo.b[2] : m.clientX - bb.left,
        t === 'h' ? bufferInfo.b[3] : m.clientY - bb.top,
      ]}]));

    }, () => undefined);
  }


  const [{isDragging}, drag, dragPreview] = useDrag(() => ({
    type: 'BUFFER',
    item: bufferInfo,
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  }), [bufferInfo])

  return (
    <div ref={dragPreview} id={`bufferCont_${bufferInfo.i}`} className={'buffer'} style={{top:t, left:l, zIndex:z, opacity:isDragging?0:1}} onMouseDown={() => dispatch(bufferToTop(bufferInfo.i))}>
      <div className={'buffer-header'} ref={drag}>
        <div className={'buffer-title'}>{bufferInfo.n}</div>
        <div className={'buffer-buttons'}>
          <div className={'buffer-button'}>_</div>
          <div className={'buffer-button'} onClick={() => dispatch(removeBuffer(bufferInfo.i))}>x</div>
        </div>
      </div>
      <div id={`buffer_${bufferInfo.i}`} style={{position:'relative',userSelect:'auto', width:w+'px', height:h+'px', margin:0}} className={'tileContainer'}>
      {typeof (bufferInfo.t as any).c === 'number'
        ? <Tile i={bufferInfo.i} p={pathRef} tileInfo={bufferInfo.t as TileInfo}/>
        : <TileNode i={bufferInfo.i} p={pathRef} nodeInfo={bufferInfo.t as TileNodeInfo}/>}
        {/*resize shims go here*/}

        <div onMouseDown={e => resize(e, 'h')} style={{position: 'absolute', width: '10px', height: '100%', top: 0, right: '-5px', cursor: 'col-resize'}}/>
        <div onMouseDown={e => resize(e, 'b')} style={{position: 'absolute', width: '20px', height: '20px', right: '-10px', bottom: '-10px', cursor: 'se-resize'}}/>
        <div onMouseDown={e => resize(e, 'v')} style={{position: 'absolute', width: '100%', height: '10px', bottom: '-10px', left: 0, cursor: 'row-resize'}}/>
      </div>
    </div>
  );
});
