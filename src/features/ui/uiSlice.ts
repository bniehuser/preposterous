import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export type Path = (0 | 1)[];

export enum TileType {
  PICKER,
  TEST,
  CHILD,
  BUI,
  MAT,
  BROWSE,

}

export interface Tile {
  s?: any;
  c: TileType;
  a?: string;
}

export interface TileNode {
  o: 'v' | 'h';
  r: number;
  c: [Tile | TileNode, Tile | TileNode];
}

export interface TileScreen {
  n: string;
  t: Tile | TileNode;
}

export interface Buffer {
  i: number,
  b: [number, number, number, number],
  n: string;
  t: Tile | TileNode;
}

export interface UIState {
  screens: TileScreen[];
  current: number;
  buffers: Buffer[];
  bufferIdx: number;
  dragNode: Tile|TileNode|undefined;
  loadingMessage?: string;
  loadingPercent?: number;
}

const initialState: UIState = {
  screens: [{
    n: 'Default', t: {
      o: 'v', r: .3, c: [
        {
          o: 'h', r: .3, c: [
            {c: TileType.PICKER},
            {c: TileType.TEST},
          ]
        },
        {
          o: 'h', r: .5, c: [
            {c: TileType.BROWSE, a: 'BUI CLR'},
            {c: TileType.BROWSE, a: 'MAT GEN'},
          ]
        },
      ]
    }
  }],
  current: 0,
  buffers: [],
  bufferIdx: 1,
  dragNode: undefined,
};

const getNodePath = (state: UIState, path: Path, idx?: number): [TileNode, number] => {
  const p = [...path]; // no altering passed array
  const ci = p.pop() || 0;
  const s = idx ? state.buffers.find(b => b.i === idx)?.t : state.screens[state.current].t;
  const n = p.reduce((a, c) => (a as TileNode).c[c], s) as TileNode;
  return [n, ci];
}

export const uiSlice = createSlice({
  name: 'tile',
  initialState,
  reducers: {
    splitTile: (state, action: PayloadAction<[Path, 'h' | 'v', number?]>) => {
      const [p, o, i] = action.payload;
      if (!p.length) {
        if (i) {
          const b = state.buffers.find(b => b.i === i);
          if (b) {
            console.log('should split buffer...', i);
            b.t = {o, r: .5, c: [b.t, {c: TileType.PICKER}]};
          }
        } else {
          state.screens[state.current].t = {o, r: .5, c: [state.screens[state.current].t, {c: TileType.PICKER}]};
        }
      } else {
        const [n, ci] = getNodePath(state, p, i) || [];
        n.c[ci] = {o, r: .5, c: [n.c[ci], {c: TileType.PICKER}]};
      }
    },
    emptyTile: (state, action: PayloadAction<[Path, number?]>) => {
      const [p, i] = action.payload;
      if (!p.length) {
        if (i) {
          const b = state.buffers.find(b => b.i === i);
          if (b) {
            const ot = b.t as Tile;
            b.t = {c: TileType.PICKER, s: {input: `${TileType[ot.c]} ${ot.a || ''}`.trim()}};
          }
        } else {
          const ot = state.screens[state.current].t as Tile;
          state.screens[state.current].t = {c: TileType.PICKER, s: {input: `${TileType[ot.c]} ${ot.a || ''}`.trim()}};
        }
      } else {
        const [n, ci] = getNodePath(state, p, i);
        const ot = n.c[ci] as Tile;
        n.c[ci] = {c: TileType.PICKER, s: {input: `${TileType[ot.c]} ${ot.a || ''}`.trim()}};
      }
    },
    removeTile: (state, action: PayloadAction<[Path, number?]>) => {
      const [p, i] = action.payload;
      if (!p.length) {
        if (i) {
          const b = state.buffers.find(b => b.i === i);
          if (b) {
            b.t = {c: TileType.PICKER};
          }
        } else {
          state.screens[state.current].t = {c: TileType.PICKER};
        }
      } else {
        const pp = [...p];
        const ci = ((pp.pop() || 0) + 1) % 2; // the other index from the one passed
        const [par, pi] = getNodePath(state, pp, i);
        // set parent to other node, destroying passed path
        par.c[pi] = (par.c[pi] as TileNode).c[ci];
      }
    },
    assignTile: (state, action: PayloadAction<[Path, Tile | TileNode, number?]>) => {
      const [p, t, i] = action.payload;
      if (!p.length) {
        if (i) {
          const b = state.buffers.find(b => b.i === i);
          if (b) {
            b.t = t;
          }
        } else {
          state.screens[state.current].t = t;
        }
      } else {
        const [n, ci] = getNodePath(state, p, i);
        n.c[ci] = t;
      }
    },
    addBuffer: (state, action: PayloadAction<Tile | TileNode | undefined>) => {
      const i = state.bufferIdx;
      state.buffers.push({
        i,
        b: [135 + ((i % 10) * 15) + (Math.floor((i / 30) % 3) * 150), 135 + ((i % 10) * 15), 450, 300],
        n: `Buffer ${state.bufferIdx}`,
        t: action.payload || {c: TileType.PICKER}
      });
      state.bufferIdx++;
    },
    updateBuffer: (state, action: PayloadAction<[number, Partial<Buffer>]>) => {
      const [idx, data] = action.payload;
      state.buffers = state.buffers.map(b => b.i === idx ? {...b, ...data} : b);
    },
    removeBuffer: (state, action: PayloadAction<number>) => {
      state.buffers = state.buffers.filter(b => b.i !== action.payload);
    },
    bufferToTop: (state, action: PayloadAction<number>) => {
      state.buffers = [...state.buffers.filter(b => b.i !== action.payload), state.buffers.find(b => b.i === action.payload)].filter(Boolean) as Buffer[];
    },
    addScreen: (state, action: PayloadAction<string>) => {
      state.screens.push({n: action.payload, t: {c: TileType.PICKER}})
      state.current = state.screens.length - 1;
    },
    setDragTile: (state, action: PayloadAction<Tile>) => {
      state.dragNode = action.payload;
    },
    dropDragTile: (state, action: PayloadAction<[Path, number?]>) => {
      if(state.dragNode) {
        const [p, i] = action.payload;
        if (!p.length) {
          if (i) {
            const b = state.buffers.find(b => b.i === i);
            if (b) {
              b.t = state.dragNode;
            }
          } else {
            state.screens[state.current].t = state.dragNode;
          }
        } else {
          const [n, ci] = getNodePath(state, p, i);
          n.c[ci] = state.dragNode;
        }
      }
    },
    chooseScreen: (state, action: PayloadAction<number>) => {
      if (state.screens[action.payload]) {
        state.current = action.payload;
      }
    },
  },
});

export const {
  splitTile,
  emptyTile,
  removeTile,
  assignTile,
  addBuffer,
  updateBuffer,
  removeBuffer,
  bufferToTop,
  setDragTile,
  dropDragTile,
  addScreen,
  // updateScreen,
  // removeScreen,
  chooseScreen,
} = uiSlice.actions;

export const selectScreen = (state: RootState) => state.ui.screens[state.ui.current];

export default uiSlice.reducer;