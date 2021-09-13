import React, { FC, ReactNodeArray } from 'react';
import classNames from 'classnames';

interface Props {
  o: 'h'|'v'
  c: ReactNodeArray
  s?: Array<number|string>
}

export const TileNodeOld: FC<Props> = ({o = 'h', c, s}) => {
  const dim = o === 'h' ? 'width' : 'height';
  const classes = classNames('node', {'horizontal': o === 'h', 'vertical': o === 'v'});
  return (
    <div className={classes}>
      {c.map((c, i) => <div key={i} style={{[dim]: s && s[i] ? s[i] : undefined}} className={'child'}>{c}</div>)}
    </div>
  );
}
