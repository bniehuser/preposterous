import classNames from 'classnames';
import React, { FC, ReactNode, useCallback, useMemo, useState } from 'react';
import { MaterialData, PlanetData, SystemData } from '../../../datatypes';
import { useAppDispatch, useDBEffect } from '../../../hooks';
import { Point, pointDistance } from '../../../util/math';
import { dbMap, NadirDB } from '../../../db';
import { nba } from 'ngraph.path';
import createGraph from 'ngraph.graph';
import { Icon } from '../Icon';
import { SpriteIcon } from '../icon/SpriteIcon';
import { SearchInput } from '../search/SearchInput';
import { addBuffer, setRoute, TileType } from '../../../../features/ui/uiSlice';

const g = createGraph<SystemData,number>();

const loadGraph = async (db: NadirDB) => {
  const systemLocations: {[k: string]: Point} = {};
  const allSys = await db.getAll('systems');

  g.clear();

  allSys.forEach(s => {
    g.addNode(s.SystemId, s);
    systemLocations[s.SystemId] = {
      x: s.PositionX,
      y: s.PositionY,
      z: s.PositionZ,
    };
  });
  allSys.forEach(s => {
    s.Connections.forEach(c => {
      g.addLink(
        s.SystemId,
        c.Connection,
        pointDistance(systemLocations[s.SystemId], systemLocations[c.Connection])
      );
    })
  });

  return g;
}

interface SearchParams {
  maxHops: number;
  selectedResources: MaterialData[];
  requireAllResources: boolean;
  sort: {
    type: 'resource'|'field',
    on: string,
    desc: boolean,
  }
}
interface DistMap {
  [k: string]: {
    path: string[];
    distance: number;
  }
}

const PlanetCard: FC<{planet: Partial<PlanetData>, hl?: (s: string|null|undefined) => ReactNode}> = ({planet, hl = s => s}) => (
  <div className={'type-larger'}>
    <div style={{display:'flex',alignItems:'top',justifyContent:'left'}}>
      <div style={{marginRight:'.25rem',marginLeft:'0'}}>
        <SpriteIcon color={planet.BuildRequirements?.some(b => b.MaterialTicker === 'AEF') ? '#d9534f' : '#eee'} img={'planet'}/>
      </div>
      <div>
        {hl(planet.PlanetName || planet.PlanetNaturalId)}<br/>
        <span className={'type-small text-secondary'}>
          {hl(g.getNode(planet.SystemId||'')?.data.Name)} / {hl(planet.FactionName)}
        </span>
      </div>
    </div>
  </div>
);

export const PlanetSearch: FC = () => {
  const dispatch = useAppDispatch();
  const [loadingMessage, setLoadingMessage] = useState<string|undefined>();
  const [distMap, setDistMap] = useState<DistMap>({})
  const [results, setResults] = useState<(Partial<PlanetData> & {hops: number, distance: number, path: string[]})[]>([]);
  const [startPlanet, setStartPlanet] = useState<PlanetData|undefined>();
  const [searching, setSearching] = useState<boolean>(false);
  const [efficiency, setEfficiency] = useState<number>(100);
  const [searchParams, setSearchParams] = useState<SearchParams>({
    maxHops:10,
    selectedResources:[],
    requireAllResources: false,
    sort: {
      type: 'resource',
      on: 'FEO',
      desc: false,
    }
  });

  console.log('gosh, we sure render a lot');
  const resourceRate = useCallback((p: Partial<PlanetData>, m: MaterialData): [number, number]|undefined => {
    const r = p.Resources?.find(r => r.MaterialId === m.MatId);
    if(r) {
      const y = r.Factor * (r.ResourceType === 'GASEOUS' ? 60 : 70) * (efficiency/100);
      return [r.Factor, y];
    }
  }, [efficiency]);

  // map distances to planets when start planet changes
  useDBEffect(async db => {
    if(startPlanet) {
      if(!g.getNodeCount()) {
        setLoadingMessage('building graph...');
        await loadGraph(db);
      }
      setLoadingMessage('loading distances...')
      await new Promise<void>((resolve) => {
        const res: { [k: string]: { path: string[], distance: number } } = {};
        const finder = nba<SystemData, number>(g, {
          distance: (f,t,l) => l.data,
        });
        g.forEachNode(c => {
          if(c.id === startPlanet.SystemId) {
            res[c.id] = { path: [c.id], distance: 0 }
          } else {
            const path = finder.find(startPlanet.SystemId, c.id);
            res[c.id] = {
              path: path.map(p => p.id as string),
              distance: path.reduce((a, c, i) => a + (i > 0 ? c.links.find(l => l.toId === path[i - 1].id)?.data : 0), 0),
            };
          }
        });
        setDistMap(res);
        resolve();
      });
      setLoadingMessage(undefined);
    }
  }, [startPlanet]);

  // get results when searchParams change
  useDBEffect(async db => {
    console.log('checking to build results', Object.keys(distMap).length)
    if(Object.keys(distMap).length) {
      setSearching(true);
      const res = await dbMap(db,
        'planets',
        p => ({...p, hops: distMap[p.SystemId].path.length - 1, distance: distMap[p.SystemId].distance, path: distMap[p.SystemId].path}),
        p => {
          if(distMap[p.SystemId].path.length >= searchParams.maxHops + 1) {
            return false;
          }
          if(searchParams.requireAllResources && !searchParams.selectedResources.every(s => p.Resources.map(r => r.MaterialId).includes(s.MatId))) {
            return false;
          } else if(!searchParams.selectedResources.some(s => p.Resources.map(r => r.MaterialId).includes(s.MatId))) {
            return false;
          }
          return true;
        },
      );
      const s = searchParams.sort;
      res.sort((a,b) => {
        return (s.type === 'resource' ? ((a.Resources?.find(i => i.MaterialId === s.on)?.Factor||0) - (b.Resources?.find(i => i.MaterialId === s.on)?.Factor||0)) :
          ((a[s.on as keyof typeof a]||0) > (b[s.on as keyof typeof b]||0) ? 1 : -1)) || ((a.PlanetNaturalId || 0) > (b.PlanetNaturalId || 0) ? 1 : -1)
      });
      if(!s.desc) { res.reverse() }
      setResults(res);
      setSearching(false);
    }
  }, [distMap, searchParams])

  // TODO: don't do this, causes an extra page load or six
  // preload startPlanet and selectedResources for testing purposes
  useDBEffect(async db => {
    const pl = await db.getFromIndex('planets','planetId','UV-351a');
    if(pl) setStartPlanet(pl);
    const sel: MaterialData[] = [];
    await Promise.all(['AMM','H','ALO','LST'].map(async m => {
      const r = await db.getFromIndex('materials', 'ticker', m);
      if (r) sel.push(r);
    }))
    console.log('setting search params');
    setSearchParams(v => ({...v, selectedResources: sel}));
  }, []);

  interface SLProps {
    type: 'resource'|'field',
    on: string,
  }
  const SortLink: FC<SLProps> = useMemo(() => ({type, on, children}) => {
    const s = searchParams.sort;
    const isSort = s.type === type && s.on === on;
    return (
      <button
        className={'linkButt'}
        onClick={e => {
          e.preventDefault();
          setSearchParams(sp => ({
            ...sp,
            sort: {type, on, desc: isSort ? !s.desc : false},
          }));
        }}
      >
        {children}
        {isSort && (s.desc ? '▲' : '▼')}
      </button>
    );
  }, [searchParams.sort]);

  // cheap planet collector
  const [planets, setPlanets] = useState<PlanetData[]>([]);
  useDBEffect(async db => setPlanets(await db.getAll('planets')), []);

  return loadingMessage ? <div className={'overlay progress'}><div className={'message'}>{loadingMessage}</div></div> : (
    <table className={classNames('table sticky', {'subtle-load': searching})}>
        <thead>
        <tr><th colSpan={12+searchParams.selectedResources.length} className={'table-header-cell-container'}>
          <section className={'table-header-content'}>
          <form className={'form'}>
            <div className={'form-component active'}>
              <label>Starting Planet</label>
              <div className={'input'}>
                <span className={'static type-very-large'}>{startPlanet?.PlanetName}</span>
                <SearchInput
                  items={planets.map(p => ({...p, SystemName: g.getNode(p.SystemId)?.data.Name || 'NOT FOUND'}))}
                  item={(i, hl) => {
                    return <button onClick={() => setStartPlanet(i)} className={'linkButt search-result'}><PlanetCard planet={i} hl={hl}/></button>
                  }}
                  stringify={(p:any) => `${p.PlanetName} ${p.PlanetNaturalId} ${p.SystemName}`}
                />
              </div>
            </div>
            <div className={'form-component active'}>
              <label>Efficiency</label>
              <div className={'input'}>
                <input type={'number'} value={efficiency} onChange={e => setEfficiency(parseFloat(e.target.value))} />
              </div>
            </div>
            <div className={'form-component active'}>
              <label>Resources</label>
              <div className={'input'}>
                {searchParams.selectedResources.map(r => (
                  <span key={r.Ticker} className={'static'}>
                    <Icon size={32} cat={r.CategoryName} ticker={r.Ticker}/>
                  </span>
                ))}
              </div>
            </div>
          </form>
          </section>
        </th></tr>
        <tr>
          <th style={{width:'15%'}}><SortLink type={'field'} on={'PlanetName'}>Planet</SortLink></th>
          <th style={{width:'2%'}} className={'number'}><SortLink type={'field'} on={'CurrentTotalPopulation'}>Population</SortLink></th>
          <th style={{width:'2%'}} className={'number'}><SortLink type={'field'} on={'distance'}>Jumps</SortLink></th>
          {searchParams.selectedResources.map(s => {
            return <th style={{width:'5%'}} key={s.Ticker} className={'symbol'}>
              <SortLink type={'resource'} on={s.MatId}>
                <span style={{display:'inline-block'}}><Icon size={24} cat={s.CategoryName} ticker={s.Ticker}/></span>
              </SortLink>
            </th>
          })}
          <th style={{width:'5%'}} className={'symbol'}><SortLink type={'field'} on={'Fertility'}>Fert</SortLink></th>
          <th style={{width:'5%'}} className={'symbol'}><SortLink type={'field'} on={'Temperature'}>Temp</SortLink></th>
          <th style={{width:'5%'}} className={'symbol'}><SortLink type={'field'} on={'Gravity'}>Grav</SortLink></th>
          <th style={{width:'5%'}} className={'symbol'}><SortLink type={'field'} on={'Pressure'}>Pres</SortLink></th>
          <th style={{width:'1%'}} className={'symbol type-small'}><SortLink type={'field'} on={'HasAdministrationCenter'}>ADM</SortLink></th>
          <th style={{width:'1%'}} className={'symbol type-small'}><SortLink type={'field'} on={'HasLocalMarket'}>LM</SortLink></th>
          <th style={{width:'1%'}} className={'symbol type-small'}><SortLink type={'field'} on={'HasWarehouse'}>WAR</SortLink></th>
          <th style={{width:'1%'}} className={'symbol type-small'}><SortLink type={'field'} on={'HasChamberOfCommerce'}>CoGC</SortLink></th>
          <th style={{width:'1%'}} className={'symbol type-small'}><SortLink type={'field'} on={'HasShipyard'}>SHY</SortLink></th>
        </tr>
        </thead>
        <tbody>
        {results.map(r => (
        <tr key={r.PlanetId} onMouseOver={() => dispatch(setRoute(r.path))} onMouseOut={() => dispatch(setRoute([]))}>
          <td>
            <button className={'linkButt'} onClick={() => {
              console.log('clicked fo real')
              dispatch(addBuffer({c: TileType.PLI, a: r.PlanetNaturalId}));
            }}>
            <PlanetCard planet={r}/>
            </button>
          </td>
          <td className={'number'}>
            {r.CurrentTotalPopulation}
            {r.CurrentTotalPopulation && <div className={'type-small text-secondary'}>
              {(r.CurrentInfrastructure?.InfrastructureReport.NextPopulationSettler || 0) <= 1 && <span style={{display:'inline-block'}}>{r.CurrentInfrastructure?.InfrastructureReport.NextPopulationPioneer} PIO</span>}
              {(r.CurrentInfrastructure?.InfrastructureReport.NextPopulationSettler || 0) > 1 && (r.CurrentInfrastructure?.InfrastructureReport.NextPopulationTechnician || 0) <= 1 && <span style={{display:'inline-block'}}>{r.CurrentInfrastructure?.InfrastructureReport.NextPopulationSettler} SET</span>}
              {(r.CurrentInfrastructure?.InfrastructureReport.NextPopulationTechnician || 0) > 1 && (r.CurrentInfrastructure?.InfrastructureReport.NextPopulationEngineer || 0) <= 1 && <span style={{display:'inline-block'}}>{r.CurrentInfrastructure?.InfrastructureReport.NextPopulationTechnician} TEC</span>}
              {(r.CurrentInfrastructure?.InfrastructureReport.NextPopulationEngineer || 0) > 1 && (r.CurrentInfrastructure?.InfrastructureReport.NextPopulationScientist || 0) <= 1 && <span style={{display:'inline-block'}}>{r.CurrentInfrastructure?.InfrastructureReport.NextPopulationEngineer} ENG</span>}
              {(r.CurrentInfrastructure?.InfrastructureReport.NextPopulationScientist || 0) > 1 && <span style={{display:'inline-block'}}>{r.CurrentInfrastructure?.InfrastructureReport.NextPopulationScientist} SCI</span>}
            </div>}
          </td>
          <td className={'number'}>
            {r.hops}<br/><span className={'type-small text-secondary'}>{r.distance.toFixed(3)}</span>
          </td>
          {searchParams.selectedResources.map(s => {
            const f = resourceRate(r, s);
            return <td key={s.Ticker} className={'symbol'} style={{position:'relative'}}>
              {f && <div className={'scaleAmount'} style={{position:'absolute',top:'1px',left:0,bottom:'1px', background:'rgba(32, 212, 32, .3)', width:f[0]*100+'%'}}/>}
              <span className={'top-text'}>{f && f[1].toFixed(2)+'/d'}</span>
            </td>
          })}
          <td className={'symbol'} style={{position:'relative'}}>
            {r.Fertility && r.Fertility > 0 && <div className={'bg-meter pos'} style={{width:r.Fertility*50+'%'}}/>}
            {r.Fertility && r.Fertility < 0 && r.Fertility !== -1 && <div className={'bg-meter neg'} style={{width:(-r.Fertility*50)+'%'}}/>}
            <span className={'top-text'}>{r.Fertility !== -1 && r.Fertility?.toFixed(2)}</span>
          </td>
          <td className={'symbol'} style={{position:'relative'}}>
            {r.BuildRequirements?.some(b => b.MaterialTicker === 'INS') && <div className={'bg-meter icon left'}><Icon ticker={'INS'} size={16} cat={'conm'}/></div>}
            {r.BuildRequirements?.some(b => b.MaterialTicker === 'TSH') && <div className={'bg-meter icon right'}><Icon ticker={'TSH'} size={16} cat={'conm'}/></div>}
            <span className={'top-text'}>{r.Temperature?.toFixed(2)}</span>
          </td>
          <td className={'symbol'} style={{position:'relative'}}>
            {r.BuildRequirements?.some(b => b.MaterialTicker === 'MGC') && <div className={'bg-meter icon left'}><Icon ticker={'MGC'} size={16} cat={'conm'}/></div>}
            {r.BuildRequirements?.some(b => b.MaterialTicker === 'BL') && <div className={'bg-meter icon right'}><Icon ticker={'BL'} size={16} cat={'chm'}/></div>}
            <span className={'top-text'}>{r.Gravity?.toFixed(2)}</span>
          </td>
          <td className={'symbol'} style={{position:'relative'}}>
            {r.BuildRequirements?.some(b => b.MaterialTicker === 'SEA') && <div className={'bg-meter icon left'}><Icon ticker={'SEA'} size={16} cat={'conm'}/></div>}
            {r.BuildRequirements?.some(b => b.MaterialTicker === 'HSE') && <div className={'bg-meter icon right'}><Icon ticker={'HSE'} size={16} cat={'conm'}/></div>}
            <span className={'top-text'}>{r.Pressure?.toFixed(2)}</span>
          </td>
          <td className={'symbol'}>
            {r.HasAdministrationCenter && '✓'}
          </td>
          <td className={'symbol'}>
            {r.HasLocalMarket && '✓'}
          </td>
          <td className={'symbol'}>
            {r.HasWarehouse && '✓'}
          </td>
          <td className={'symbol'}>
            {r.HasChamberOfCommerce && '✓'}
          </td>
          <td className={'symbol'}>
            {r.HasShipyard && '✓'}
          </td>
        </tr>
      ))}
      </tbody>
      <tfoot/>
    </table>
  );
}
