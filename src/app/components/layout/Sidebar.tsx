import React, { FC } from 'react';
import { SidebarItem } from './SidebarItem';

export const Sidebar: FC = () => {
  return (
    <div className={'sidebar'}>
      <div className={'logo'} style={{fontSize: '28px'}}>🤣</div>
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
      <div className={'app-title'}>Preposterous</div>
    </div>
  );
}
