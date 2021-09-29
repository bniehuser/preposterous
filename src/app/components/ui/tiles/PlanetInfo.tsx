import React, { FC, useState } from 'react';
import { PlanetData, MaterialData, SystemData, SiteData, WorkforceData, ProductionData } from '../../../datatypes';
import { useDBEffect } from '../../../hooks';
import { Icon } from '../Icon';
import { SpriteIcon } from '../icon/SpriteIcon';

interface ExtendedSiteData extends SiteData {
  workforce?: WorkforceData;
  production?: ProductionData;
  io?: ProdIOList;
  materials?: {[k: string]: MaterialData};
}

interface IOList {inputs: {[k: string]: number}, outputs: {[k:string]: number}}
interface ProdIOList extends IOList {
  lines: {[k: string]: IOList};
}

export const PlanetInfo: FC<{planet: PlanetData|string}> = ({planet: propPlanet}) => {
  const [planet, setPlanet] = useState<PlanetData|undefined>()
  const [system, setSystem] = useState<SystemData|undefined>()
  const [costs, setCosts] = useState<Array<{count: number, data: MaterialData}>>([])
  const [prods, setProds] = useState<Array<{count: number, type: string, data: MaterialData}>>([])
  const [siteData, setSiteData] = useState<ExtendedSiteData|undefined>();

  useDBEffect(async db => {
    let p: PlanetData|undefined;
    if(typeof propPlanet === 'string') {
      p = await db.get('planets', propPlanet);
    } else if(propPlanet) {
      p = propPlanet as PlanetData;
    }
    if(p) {
      setPlanet(p);
      setSystem(await db.get('systems', p.SystemId));
    }
  }, [propPlanet]);

  useDBEffect(async db => {
    if(planet) {
      const newCosts: Array<{count: number, data: MaterialData}> = [];
      const products: Array<{count: number, type: string, data: MaterialData}> = [];
      for (let i = 0; i < planet.BuildRequirements.length; i++) {
        const bc = planet.BuildRequirements[i];
        const data = await db.getFromIndex('materials', 'ticker', bc.MaterialTicker);
        if (data) {
          newCosts.push({count: bc.MaterialAmount, data});
        }
      }
      setCosts(newCosts);
      for (let i = 0; i < planet.Resources.length; i++) {
        const r = planet.Resources[i];
        const prod = await db.get('materials', r.MaterialId);
        if (prod) {
          products.push({count: r.Factor, type: r.ResourceType, data: prod});
        }
      }
      setProds(products);

      // how about some site data, eh?
      const site = await db.getFromIndex('sites', 'planetId', planet.PlanetId)
      if(site) {
        const workforce = await db.get('workforce', site.SiteId)
        const production = await db.get('production', site.SiteId)

        // ok, let's summarize production
        // for each production line, get the recurring orders, summing and deduping
        let io: ProdIOList|undefined = undefined;
        if(production) {
          // get the submission date
          const sd = new Date(production.Timestamp);
          // const io2 = production.ProductionLines.reduce((a, c) => {
          //   const ro = c.Orders
          //     .filter(o => o.Recurring
          //       && (o.StartedEpochMs === null
          //         || o.Outputs.filter(i => i.MaterialTicker === o.Outputs[0].MaterialTicker).length > 1));
          //   const ttime = ro.reduce((tacc, o) => tacc + o.DurationMs, 0);
          //   const l = ro.reduce((oacc, o) => {
          //       const getMatUsage = m => {
          //         const rr = m.DurationMs/ttime;
          //         return (86400000/o.DurationMs) * rr * l.Capacity;
          //       };
          //       [...o.Outputs.map(getMatUsage),...o.Inputs.map(m => getMatUsage(m, true))].forEach(m => {
          //         oacc[m.ticker] = (oacc[m.ticker] || 0) + m.amount;
          //       });
          //       return oacc;
          //     }, {} as {[k:string]:number});
          //   a.lines[c.Type] = l;
          //   Object.keys(l).forEach(m => {
          //     a.mats[m] = (a.mats[m] || 0) + l[m];
          //   });
          //   return a;
          // }, {lines: {}, mats: {}} as {lines:{[k:string]:{[k:string]:number}},mats:{[k:string]:number}})
          io = production.ProductionLines.reduce((acc, p) => {
            // TODO: find out why we double down on some of these
            const ro = p.Orders.filter(o => o.Recurring && (o.StartedEpochMs === null || o.Outputs.filter(i => i.MaterialTicker === o.Outputs[0].MaterialTicker).length > 1));
            const ttime = ro.reduce((tacc, o) => tacc + o.DurationMs, 0);
            const outputs = ro.reduce((oacc, o) => {
              const rr = o.DurationMs/ttime;
              const daily = (86400000/o.DurationMs) * rr * p.Capacity;
              const usedTickers: string[] = [];
              o.Outputs.forEach(out => {
                if(out.MaterialTicker && !usedTickers.includes(out.MaterialTicker)) {
                  usedTickers.push(out.MaterialTicker);
                  if (!oacc[out.MaterialTicker]) {
                    oacc[out.MaterialTicker] = 0;
                  }
                  oacc[out.MaterialTicker] += daily * out.MaterialAmount;
                }
              }) // really?
              return oacc;
            }, {} as {[k: string]: number})
            const inputs = ro.reduce((oacc, o) => {
              const rr = o.DurationMs/ttime;
              const daily = (86400000/o.DurationMs) * rr * p.Capacity;
              const usedTickers: string[] = [];
              o.Inputs.forEach(inp => {
                if(inp.MaterialTicker && !usedTickers.includes(inp.MaterialTicker)) {
                  usedTickers.push(inp.MaterialTicker);
                  let req = (daily * inp.MaterialAmount);
                  if(outputs[inp.MaterialTicker]) {
                    const prod = outputs[inp.MaterialTicker];
                    if (prod > req) {
                      outputs[inp.MaterialTicker] -= req;
                      req = 0;
                    } else {
                      req -= prod;
                      delete outputs[inp.MaterialTicker];
                    }
                  }
                  if(req) {
                    if (!oacc[inp.MaterialTicker]) {
                      oacc[inp.MaterialTicker] = 0;
                    }
                    oacc[inp.MaterialTicker] += req;
                  }
                }
              })
              return oacc;
            }, {} as {[k: string]: number})
            acc.lines[p.Type] = {inputs, outputs}
            return acc;
          }, {lines: {}, inputs:{}, outputs:{}} as ProdIOList)
          io.outputs = Object.keys(io.lines).reduce((acc, k) => {
            if(io) {
              const l = io.lines[k];
              Object.keys(l.outputs).forEach(out => {
                if (!acc[out]) {
                  acc[out] = 0;
                }
                acc[out] += l.outputs[out];
              });
            }
            return acc;
          }, {} as {[k: string]: number})
          io.inputs = Object.keys(io.lines).reduce((acc, k) => {
            if(io) {
              const l = io.lines[k];
              Object.keys(l.inputs).forEach(inp => {
                let req = l.inputs[inp];
                if(io) {
                  if (io.outputs[inp]) {
                    const prod = io.outputs[inp];
                    if (prod > req) {
                      io.outputs[inp] -= req;
                      req = 0;
                    } else {
                      req -= prod;
                      delete io.outputs[inp];
                    }
                  }
                  if (req) {
                    if (!acc[inp]) {
                      acc[inp] = 0;
                    }
                    acc[inp] += req;
                  }
                }
              });
            }
            return acc;
          }, {} as {[k: string]: number})
        }

        const materials: {[k: string]: MaterialData} = {};
        if(io) {
          console.log('well we had io...');
          const u = new Set([...Object.keys(io.inputs), ...Object.keys(io.outputs)]);
          console.log(u, u.keys(), u.entries(), u.values());
          for(let t of Array.from(u)) {
            console.log('what is t?', t);
            const m = await db.getFromIndex('materials', 'ticker', t);
            if(m) {
              materials[t] = m;
            }
          }
        }
        console.log('full site data:',{...site, workforce, production, io, materials})
        setSiteData({...site, workforce, production, io, materials})

        // add their processing time, divide each unique by sum for percentage
        // find how many output runs are covered by this percentage per day and collect these output values
        // also collect input values; subtract from output values where present and store remainders
        // build input/output summary for site


      }
    }
  }, [planet]);

  // TODO: global efficiency calc?  see PlanetSearch for efficiency modifier
  const daily = (r: {count: number, type: string, data: MaterialData}) => r.count * (r.type === 'GASEOUS' ? 60 : 70);


  return planet ? (
    <div className={'planet-info form'}>
      <div className={'planet-title'}>
        <div style={{float: 'left', marginRight: '.2rem'}}><SpriteIcon color={planet.BuildRequirements?.some(b => b.MaterialTicker === 'AEF') ? '#d9534f' : '#eee'} img={'planet'}/></div>
        <div className={'planet-name'}>{planet.PlanetName}</div>
        <div>{[system?.Name, planet.FactionName || <em>No Faction</em>].filter(Boolean).join(' / ')}</div>
      </div>
      <div className={'tile-break'}/>
      {siteData && (
      <>
      <div className={'form-component passive'}>
        <label className={''}>Base</label>
        <div className={'input'}><div className={'static'} style={{display:'flex',flexDirection:'row',justifyContent:'right'}}>
          {Object.keys(siteData.io?.inputs||{}).map((i, k) => (
            <Icon key={k} size={33} cat={(siteData.materials||{})[i].CategoryName} ticker={(siteData.materials||{})[i].Ticker} inset={(siteData.io?.inputs[i]||0).toFixed(1)+'/d'}/>
          ))}
        </div><div className={'static'} style={{display:'flex',flexDirection:'row',justifyContent:'right'}}>
          {Object.keys(siteData.io?.outputs||{}).map((i, k) => (
            <Icon key={k} size={33} cat={(siteData.materials||{})[i].CategoryName} ticker={(siteData.materials||{})[i].Ticker} inset={(siteData.io?.outputs[i]||0).toFixed(1)+'/d'}/>
          ))}
        </div></div>
      </div>
      <div className={'tile-break'}/>
      </>
      )}
      <div className={'tile-subsection stack-horiz'}>
      <div className={'form-component passive'}>
        <label className={''}>Pioneers</label>
        <div className={'input'}><div className={'static'}>{planet.CurrentInfrastructure?.InfrastructureReport.NextPopulationPioneer || '--'}</div></div>
      </div>
      <div className={'form-component passive'}>
        <label className={''}>Settlers</label>
        <div className={'input'}><div className={'static'}>{planet.CurrentInfrastructure?.InfrastructureReport.NextPopulationSettler || '--'}</div></div>
      </div>
        <div className={'form-component passive'}>
          <label className={''}>Technicians</label>
          <div className={'input'}><div className={'static'}>{planet.CurrentInfrastructure?.InfrastructureReport.NextPopulationTechnician || '--'}</div></div>
        </div>
        <div className={'form-component passive'}>
          <label className={''}>Engineers</label>
          <div className={'input'}><div className={'static'}>{planet.CurrentInfrastructure?.InfrastructureReport.NextPopulationEngineer || '--'}</div></div>
        </div>
        <div className={'form-component passive'}>
          <label className={''}>Scientists</label>
          <div className={'input'}><div className={'static'}>{planet.CurrentInfrastructure?.InfrastructureReport.NextPopulationScientist || '--'}</div></div>
        </div>
      </div>
      <div className={'tile-break'}/>
      <div className={'form-component passive'}>
        <label className={''}>Governor</label>
        <div className={'input'}><div className={'static'}>{planet.GovernorId ? <>[{planet.GovernorCorporationCode}] {planet.GovernorUserName}<br/><span className={'type-small text-secondary'}>{planet.GovernorCorporationName}</span></> : '--'}</div></div>
      </div>
      <div className={'form-component passive'}>
        <label className={''}>Build Costs</label>
        <div className={'input'}><div className={'static'}><div style={{display:'flex',flexDirection:'row'}}>{costs.map(c => (
          <div key={c.data.Ticker} style={{margin:'2px'}}><Icon key={c.data.Ticker} size={33} cat={c.data.CategoryName} ticker={c.data.Ticker} inset={c.count}/></div>
        ))}</div></div></div>
      </div>
      <div className={'form-component passive'}>
        <label className={''}>Resources</label>
        <div className={'input'}><div className={'static'}><div style={{display:'flex',flexDirection:'row'}}>{prods.map(c => (
          <div key={c.data.Ticker} style={{margin:'2px'}}><Icon key={c.data.Ticker} size={36} cat={c.data.CategoryName} ticker={c.data.Ticker} inset={daily(c).toFixed(1) + '/d'}/></div>
        ))}</div></div></div>
      </div>
    </div>
  ) : null;
}
