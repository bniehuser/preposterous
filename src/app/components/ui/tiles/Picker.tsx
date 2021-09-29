import classNames from 'classnames';
import React, { FC, useEffect, useRef, useState } from 'react';
import { useDrop } from 'react-dnd';
import { assignTile, bufferToTop, emptyTile, Path, Tile, TileType } from '../../../../features/ui/uiSlice';
import { useAppDispatch } from '../../../hooks';

interface Props {
  p: Path;
  i?: number;
  s: {
    input?: string;
    error?: string;
  }
}

export const Picker: FC<Props> = ({p, i, s}) => {
  const [input, setInput] = useState<string>(s?.input || '');
  const [error, setError] = useState<string>(s?.error || '');
  const dispatch = useAppDispatch();
  const textBox = useRef<HTMLInputElement>(null);

  useEffect(() => {
    textBox.current?.focus();
  }, []);

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    // The type (or types) to accept - strings or symbols
    accept: 'TILE',
    // Props to collect
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    }),
    drop: (item: [Path,Tile,number?]) => {
      console.log(item);
      dispatch(emptyTile([item[0], item[2]]));
      dispatch(assignTile([p, item[1], i]));
      if(i) {
        dispatch(bufferToTop(i))
      }
    },
  }))

  const pick = () => {
    const ia = input.split(' ');
    const ip = [ia.shift() as string];
    ip.push(ia.join(' '));
    if(!TileType.hasOwnProperty(ip[0])) {
      setError('Illegal Command');
    } else {
      const tileData = {c: TileType[ip[0] as keyof typeof TileType], a: ip[1]};
      dispatch(assignTile([p, tileData, i]))
    }
  }
  return (
    <div className={classNames('selector', { 'hovered': isOver && canDrop })} ref={drop}>
      <form className={'form'} onSubmit={e => { e.preventDefault(); pick(); }}>
        <div className={'input'}>
          <input ref={textBox} type={'text'} placeholder={'Enter content command'} style={{width:'100%',textAlign:'left'}} value={input} onChange={e => setInput(e.target.value)}/>
          {error && <div className={'warning'}>{error}</div>}
        </div>
      </form>
    </div>
  );
}
