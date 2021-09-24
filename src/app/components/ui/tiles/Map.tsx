import createGraph from 'ngraph.graph';
import panzoom from 'panzoom';
import React, { FC, useEffect, useRef, useState } from 'react';
import { CurrencyId, SystemData } from '../../../datatypes';
import { NadirDB } from '../../../db';
import { useAppSelector, useDBEffect } from '../../../hooks';
import { Point, pointDistance } from '../../../util/math';

const g = createGraph<SystemData & {CurrencyCode: CurrencyId|null},number>();

const loadGraph = async (db: NadirDB) => {
  const systemLocations: {[k: string]: Point} = {};
  const allSys = await db.getAll('systems');

  g.clear();

  for (let i=0; i<allSys.length; i++) {
    const s = allSys[i];
    systemLocations[s.SystemId] = {
      x: s.PositionX,
      y: s.PositionY,
      z: s.PositionZ,
    };
    const p = await db.getFromIndex('planets', 'planetId', s.NaturalId + 'a')
    g.addNode(s.SystemId, {...s, CurrencyCode: p?.CurrencyCode||null});
  }
  allSys.forEach(s => {
    s.Connections.forEach(c => {
      console.log('checking distance from ',systemLocations[s.SystemId], systemLocations[c.Connection])
      g.addLink(
        s.SystemId,
        c.Connection,
        pointDistance(systemLocations[s.SystemId], systemLocations[c.Connection])
      );
    })
  });

  return g;
}

type SubsectorMin = [number, number, number, number, number, number, string];
type SectorMin = [SubsectorMin[], CurrencyId|null];
type SystemMin = [number, number, CurrencyId|null, string, string];
type SystemLinkMin = [number, number, number, number, CurrencyId|null, string, string];

export const Map: FC = () => {
  const route = useAppSelector(state => state.ui.route);
  const [systems, setSystems] = useState<SystemMin[]>([]);
  const [links, setLinks] = useState<SystemLinkMin[]>([]);
  const [sectors, setSectors] = useState<SectorMin[]>([]);
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    if(ref.current) {
      const z = panzoom(ref.current, {
        initialX: 0,
        initialY: 0,
        initialZoom: 1,
      });
      return () => z.dispose();
    }
  }, [])
  useDBEffect(async db => {
    await loadGraph(db);
    const newSystems: SystemMin[] = [];
    const newLinks: SystemLinkMin[] = [];
    const sectors = await db.getAll('sectors');
    const newSectors = sectors.map(s => [
      s.SubSectors.map(ss =>
        [...ss.Vertices.reduce((a, c) => {a.push(c.X,c.Y); return a;}, [] as number[]), ss.SSId] as SubsectorMin,
      ),
      s.Name
    ] as SectorMin);
    const usedNodes: {[k: string]: boolean} = {};
    const usedLinks: {[k: string]: boolean} = {};
    g.forEachLink((l) => {
      const f = g.getNode(l.fromId);
      const t = g.getNode(l.toId);
      const linkId = [f?.id,t?.id].sort().join('-');
      if(!newSystems.length) {
        if(f) {
          usedNodes[f.id] = true;
          newSystems.push([f.data.PositionX, f.data.PositionY, f.data.CurrencyCode, f.data.Name, f.data.SystemId]);
        }
      }
      if (f && t && !usedLinks[linkId]) {
        usedLinks[linkId] = true;
        newLinks.push([f.data.PositionX, f.data.PositionY, t.data.PositionX, t.data.PositionY, f.data.CurrencyCode === t.data.CurrencyCode ? t.data.CurrencyCode : null, f.data.SystemId, t.data.SystemId]);
      }
      if(t && !usedNodes[t.id]) {
        usedNodes[t.id] = true;
        newSystems.push([t.data.PositionX, t.data.PositionY, t.data.CurrencyCode, t.data.Name, t.data.SystemId]);
      }
    });
    console.log('setting stuff');
    setSectors(newSectors);
    setSystems(newSystems)
    setLinks(newLinks)
  }, [])
  return <svg ref={ref} className={'svg-map'} viewBox={'-1400 -1400 3000 3000'} preserveAspectRatio={'xMidYMid meet'} width={'100%'} height={'100%'}>
    <g transform={'scale(1 -1)'}>
    {sectors.map((s, i) => <g
      className={'map-group'}
      key={`sec_${i}`}
    >{s[0].map((ss, j) => <polygon
      key={`p_${i}_${j}`}
      strokeWidth="2"
      stroke={'#222'}
      points={`${ss[0]},${ss[1]} ${ss[2]},${ss[3]} ${ss[4]},${ss[5]}`}
    />)}
      <svg {...getCenterPoint(s)} className={'sub-display'}><text textAnchor="middle" dominantBaseline="central" transform={'scale(1 -1)'} className={'sector-name'}>{s[1]}</text></svg>
    </g>)}
    {links.map((s, i) => <line key={`l_${i}`} x1={s[0]} y1={s[1]} x2={s[2]} y2={s[3]} className={`system-link ${s[4]} ${route.indexOf(s[5]) > -1 && route.indexOf(s[6]) > -1 && 'route'}`} />)}
      {systems.sort((a, b) => b[1] - a[1]).map((s, i) => <g key={`s_${i}`} className={`system-indicator ${s[2]} ${(route[0] === s[4] || route[route.length-1] === s[4]) && 'route-end'}`}>
        <circle cx={s[0]} cy={s[1]} r={5} className={`system ${s[2]} ${route.indexOf(s[4]) > -1 && 'route'}`} />
        <svg x={s[0]} y={s[1]} className={'sub-display'}><text transform={'scale(1 -1) translate(-10 -12)'} className={`system-name ${s[2]}`}>{s[3]}</text></svg>
      </g>)}
    </g>
  </svg>
};


const getCenterPoint = (l: SectorMin): {x: number, y: number} => {
  const points = l[0].reduce((a, c) => { a.push([c[0], c[1]],[c[2], c[3]],[c[4], c[5]]); return a; }, [] as [number, number][] )
  const xs = points.map(i => i[0]);
  const ys = points.map(i => i[1]);
  const minx = Math.min(...xs);
  const miny = Math.min(...ys);
  return { x: minx + ((Math.max(...xs) - minx) / 2), y: miny + ((Math.max(...ys) - miny) / 2)};
}
