import moment from 'moment';
import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Auth, TileContainer, Update } from './app/components/container';
import { Foot, Head, Sidebar, TileNode } from './app/components/layout';
import { Icon, Tile } from './app/components/ui';
import { BuildingInfo } from './app/components/ui/BuildingInfo';
import { MaterialInfo } from './app/components/ui/MaterialInfo';
import { BuildingData, MaterialData } from './app/datatypes';
import { useAppSelector, useDB } from './app/hooks';
import './app/style/app.scss';
import { camelToTitle } from './app/util/strings';
import { selectToken } from './features/auth/authSlice';
import { OpenAPI } from './services/openapi';

function App() {
  const token = useAppSelector(selectToken);
  OpenAPI.TOKEN = token;
  const appState = useAppSelector(state => state.app);
  const expires = useAppSelector(state => state.auth.expires ? moment(state.auth.expires).format('MM DD HH:MM:SS') : null);
  const [planetCount, setPlanetCount] = useState<number | undefined>();
  const [buildings, setBuildings] = useState<BuildingData[]>([]);
  const [currBuilding, setCurrBuilding] = useState<BuildingData | undefined>(undefined);
  const [materials, setMaterials] = useState<MaterialData[]>([]);
  const [currMaterial, setCurrMaterial] = useState<MaterialData | undefined>(undefined);

  // app won't load at all without db.  this should be a fast operation.
  const [db] = useDB(async db => {
    setPlanetCount(await db.count('planets'));
    const newBuildings: BuildingData[] = await db.getAll('buildings');
    setBuildings(newBuildings.filter(b => b.Expertise));
    const newMaterials: MaterialData[] = await db.getAll('materials');
    newMaterials.sort((a, b) => a.Ticker > b.Ticker ? 1 : -1)
    setMaterials(newMaterials);
  }, true);

  if (!db) {
    console.log('db is null?');
    return null;
  } // should never get here

  const testTile = (
    <Tile title={'Test'}>
      <section className={'content'}>
        <p>({planetCount}) No really this is a test: {token} {expires}</p>
        <div style={{display: 'flex', flexWrap: 'wrap'}}>
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
            <Sidebar/>
            {appState.loading ?
              <div className={'body'}><Update loadingMessage={appState.loadingMessage}
                                              loadingPercent={appState.loadingPercent}/></div>
              :
              <div className={'body'}>
                <Head/>
                <div className={'main'}>
                  <div style={{
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    <TileContainer>
                      <Switch>
                        <Route path={'/update'}><Update/></Route>
                        <Route path={'/login'}><Auth/></Route>
                        <Route path={'/'}>
                          {token && <TileNode o='v' s={['30%', '70%']} c={[(
                            <TileNode o='h' s={['30%', '70%']} c={[(testTile), (testTile)]}/>
                          ), (
                            <TileNode o='h' s={['50%', '50%']} c={[(
                              <Tile title={'Building Browser'}>
                                <form className={'form'}>
                                  <div className={'form-component active'}>
                                    <label className={'active'}>Building</label>
                                    <div className={'input'}>
                                      <select value={currBuilding?.Ticker}
                                              onChange={e => setCurrBuilding(buildings.find(b => b.Ticker === e.target.value))}>
                                        {buildings.map(b => <option key={b.Ticker}
                                                                    value={b.Ticker}>({b.Ticker}) {camelToTitle(b.Name)}</option>)}
                                      </select>
                                    </div>
                                  </div>
                                </form>
                                {currBuilding && <BuildingInfo building={currBuilding}/>}
                              </Tile>
                            ), (
                              <Tile title={'Material Browser'}>
                                <form className={'form'}>
                                  <div className={'form-component active'}>
                                    <label className={'active'}>Material</label>
                                    <div className={'input'}>
                                      <select value={currMaterial?.Ticker}
                                              onChange={e => setCurrMaterial(materials.find(b => b.Ticker === e.target.value))}>
                                        {materials.map(b => <option key={b.Ticker}
                                                                    value={b.Ticker}>({b.Ticker}) {camelToTitle(b.Name)}</option>)}
                                      </select>
                                    </div>
                                  </div>
                                </form>
                                {currMaterial && <MaterialInfo material={currMaterial}/>}
                              </Tile>
                            )]}/>
                          )]}/>}
                        </Route>
                      </Switch>
                    </TileContainer>
                  </div>
                </div>
                <Foot/>
              </div>
            }
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
