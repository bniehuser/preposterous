import { RootState } from './store';

export const saveState = (state: DeepPartial<RootState>) => {
  if(state) {
    localStorage.setItem('preposterous', JSON.stringify(state));
  }
}

export const loadState = () => {
  console.log(localStorage.getItem('preposterous'));
  return JSON.parse(localStorage.getItem('preposterous') || '{}');
}
