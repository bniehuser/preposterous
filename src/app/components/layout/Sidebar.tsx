import React, { FC } from 'react';
import { useAppSelector } from '../../hooks';
import { appLoading } from '../../store';
import { SidebarItem } from './SidebarItem';

export const Sidebar: FC = () => {
  const loading = useAppSelector(appLoading);
  return (
    <div className={'sidebar'}>
      <div className={'logo'} style={{fontSize: '28px'}}>{loading ? '🤔' : '🤣'}</div>
      <div className={'uiToggles'}>
        <SidebarItem title={'SOME'}/>
        <SidebarItem title={'COOL'} active={true}/>
        <SidebarItem title={'STUFF'}/>
        <SidebarItem title={'HERE'}/>
      </div>
      <div className={'uiToggles'}>
        <SidebarItem type={'Secondary'} title={'WITH'} pulse={true}/>
        <SidebarItem type={'Secondary'} title={'SOME'}/>
        <SidebarItem type={'Secondary'} title={'OTHER'} active={true}/>
        <SidebarItem type={'Secondary'} title={'OPTS'}/>
        <SidebarItem type={'Secondary'} title={'TO'}/>
        <SidebarItem type={'Secondary'} title={'COME'} active={true}/>
      </div>
      <div className={'app-title'}>NADIR&nbsp;alpha</div>
    </div>
  );
}
