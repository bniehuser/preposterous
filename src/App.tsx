import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Auth } from './app/components/container/Auth';
import { TileContainer } from './app/components/container/TileContainer';
import { Foot } from './app/components/layout/Foot';
import { Head } from './app/components/layout/Head';
import { Sidebar } from './app/components/layout/Sidebar';
import { Icon } from './app/components/ui/Icon';
import { Tile } from './app/components/ui/Tile';
import './app/style/app.scss';
import { useAppSelector } from './app/hooks';
import { selectToken } from './features/auth/authSlice';
import moment from 'moment';
import { TileNode } from './app/components/layout/TileNode';

function App() {
  const token = useAppSelector(selectToken);
  const expires = useAppSelector(state => moment(state.auth.expires).format('MM DD HH:MM:SS'));
  const testTile = (
    <Tile title={'Test'}>
      <section className={'content'}>
        <p>No really this is a test: {token} {expires}</p>
        <div style={{display:'flex', flexWrap:'wrap'}}>
          <Icon cat={'agr'} ticker={'RCO'}/>
          <Icon cat={'conm'} ticker={'MCG'}/>
          <Icon cat={'conp'} ticker={'TRU'}/>
          <Icon cat={'conf'} ticker={'BSE'}/>
          <Icon cat={'conb'} ticker={'RAT'} inset={123}/>
          <Icon cat={'conl'} ticker={'PWO'}/>
          <Icon cat={'pla'} ticker={'PG'}/>
          <Icon size={32} cat={'chm'} ticker={'FLX'}/>
          <Icon size={28} cat={'bui'} ticker={'REF'}/>
        </div>
      </section>
    </Tile>
  );

  return (
    <BrowserRouter>
    <div tabIndex={-1} style={{height: '100%'}}>
      <div tabIndex={-1} style={{height: '100%'}}>
        <div className={'container'}>
          <Sidebar />
          <div className={'body'}>
            <Head />
            <div className={'main'}>
              <div style={{top:0,bottom:0,left:0,right:0,position:'absolute',display:'flex',flexDirection:'column'}}>
                <TileContainer>
                <Switch>
                  <Route path={'/login'}><Auth /></Route>
                  <Route path={'/'}>
                    {token && <TileNode o='v' s={['30%','70%']} c={[(
                      <TileNode o='h' s={['30%','70%']} c={[(testTile), (testTile)]} />
                    ), testTile]} />
                    }
                  </Route>
                </Switch>
                </TileContainer>
              </div>
            </div>
            <Foot />
          </div>
        </div>
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
