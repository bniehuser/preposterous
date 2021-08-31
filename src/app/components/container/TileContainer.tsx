import React, { FC } from 'react';



export const TileContainer: FC = ({children}) => {
  return (
    <div className={'tileContainer'}>
      {children}
    </div>
  );
}
