import classNames from 'classnames';
import React, { FC } from 'react';

interface Props {
  title: string;
  type?: string;
  action?: () => void;
  active?: boolean;
  pulse?: boolean;
}

export const SidebarItem: FC<Props> = ({title, type = 'Primary', action, active = false, pulse = false}) => {
  const classes = classNames(`toggleIndicator${type}`, {
    [`toggleIndicator${type}Active`]: active,
    [`toggleIndicatorPulseActive`]: pulse,
  });
  return (
    <div className={'toggle'} onClick={() => action ? action() : undefined}>
      <div className={'toggleLabel'}>{title}</div>
      <div className={classes}/>
    </div>
  );
}
