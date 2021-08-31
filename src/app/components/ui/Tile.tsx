import React, { FC } from 'react';

interface Props {
  title?: string;
}

export const Tile: FC<Props> = ({title, children}) => {
  return <article className={'tile'}>
    {title && <div className={'header'}><div className={'title'}>{title}</div></div>}
    <div className={'body'}>{children}</div>
  </article>;
}
