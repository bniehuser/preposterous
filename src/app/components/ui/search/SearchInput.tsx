import React, { FC, ReactNode, useCallback, useState } from 'react';
import { debounce } from 'lodash';

const RES_MAX_LEN = 10; // s/b configurable

type Highlighter = (s: string, m: string, qre?: RegExp) => ReactNode;

interface Props<T> {
  items: T[];
  item: (i: T, hl: (s: string) => ReactNode) => ReactNode;
  q?: string;
  stringify?: (i:T) => string;
  search?: (i:T, q: string, qre?: RegExp) => number;
  maxItems?: number;
  highlighter?: Highlighter
}

export const SearchInput: FC<Props<any>> = ({
  item,
  items,
  q: qProp,
  stringify = (i:any) => {
    const o = String(i);
    return o === '[object Object]' ? JSON.stringify(i) : o;
  },
  search = (i:any, q: string, qre?: RegExp) => {
    const s = stringify(i);
    const f = s.match(qre || new RegExp(q, 'g'))?.length;
    return f ? (f * q.length) / s.length : 0;
  },
  maxItems = RES_MAX_LEN,
//  highlighter = s => s,
  highlighter = (s, m, qre) => {
    const re = qre || new RegExp(`(${m})`, 'gi');
    return s.split(re).map(p => p.match(re) ? <span className={'highlight'}>{p}</span> : p);
  },
}) => {
  const [q, setQ] = useState<string>(qProp || '')
  const [results, setResults] = useState<(typeof item)[]>([]);

  const doSearch = (q: string) => {
    console.log('should be searching', items.length);
    const qre = new RegExp(q, 'gi');
    // this will be funny ha ha
    setResults(
      items
        .map(i => ({score: search(i, q, qre), data: i}))
        .filter(l => l.score > 0)
        .sort((a, b) => a.score - b.score)
        .slice(0, maxItems)
        .map(i => i.data)
    )
  }

  const update = useCallback(debounce(q => doSearch(q), 300), []);

  const debouncedSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const v = e.target.value;
    console.log('should be typing', v)
    setQ(v);
    update(v);
  }

  return <div className={'search-input'}>
    <input type={'text'} value={q} onChange={debouncedSearch} />
    <div className={'search-results'}>
      {results.map((r, i) => <div key={i}>{item(r, s => highlighter(s, q))}</div>)}
    </div>
  </div>
}
