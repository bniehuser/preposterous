import React, { useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Auth, Splash, TileContainer, Update } from './app/components/container';
import { Foot, Head, Sidebar } from './app/components/layout';
import { Tile, TileNode } from './app/components/ui';
import { Buffers } from './app/components/ui/Buffers';
import { useAppDispatch, useAppSelector, useDB } from './app/hooks';
import './app/style/app.scss';
import { selectToken } from './features/auth/authSlice';
import { selectScreen, Tile as TileInfo, TileNode as TileNodeInfo, Buffer as BufferInfo, updateBuffer, addBuffer } from './features/ui/uiSlice';
import { OpenAPI } from './services/openapi';

function App() {
  const token = useAppSelector(selectToken);
  OpenAPI.TOKEN = token;
  const appState = useAppSelector(state => state.app);
  const screen = useAppSelector(selectScreen);
  const dispatch = useAppDispatch();
  const [pathRef] = useState([]);

  const [, drop] = useDrop(() => ({
    accept: 'BUFFER',
    drop: (item: BufferInfo, monitor) => {
      const d = monitor.getDifferenceFromInitialOffset();
      if(d) {
        console.log('d', d, item.b[0], item.b[1], item.b[0] + d.x, item.b[1] + d.y);
        dispatch(updateBuffer([item.i, {
          b: [
            item.b[0] + d.x,
            item.b[1] + d.y,
            item.b[2], item.b[3],
          ]
        }]));
      }
    }
  }));

  useEffect(() => {
    const l = (e: KeyboardEvent) => e.ctrlKey && e.key === ' ' && dispatch(addBuffer())
    document.addEventListener('keydown', l);
    return () => document.removeEventListener('keydown', l)
  }, [dispatch]);

  // app won't load at all without db.  this should be a fast operation.
  const [db, updateDB] = useDB(async () => undefined, true);

  // TODO: this should be automatically done elsewhere
  useEffect(() => {
    // upon login, update the db to fetch user data
    if(token) {
      updateDB('all').then(() => console.log('updated db'));
    }
  }, [updateDB, token])

  if (!db) {
    console.log('db is null?');
    return null;
  } // should never get here

  return (
    <BrowserRouter>
      <div tabIndex={-1} style={{height: '100%'}}>
        <div tabIndex={-1} style={{height: '100%'}}>
          <div className={'container'} ref={drop}>
            <Sidebar/>
            {appState.connecting ?
              <div className={'body'} style={{position: 'relative'}}>
                <Update loadingMessage={'connecting to NADIR interface...'}/>
              </div>
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
                      {appState.initializing ? <Splash /> : (
                      <Switch>
                        <Route path={'/update'}><Update/></Route>
                        <Route path={'/login'}><Auth/></Route>
                        <Route path={'/'}>

                          {token && (typeof (screen.t as any).c === 'number'
                            ? <Tile p={pathRef} tileInfo={screen.t as TileInfo}/>
                            : <TileNode p={pathRef} nodeInfo={screen.t as TileNodeInfo}/>)}
                        </Route>
                      </Switch>
                      )}
                    </TileContainer>
                  </div>
                </div>
                <Foot/>
                {!appState.initializing && <Buffers/>}
              </div>
            }
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
