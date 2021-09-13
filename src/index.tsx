import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ReactDOM from 'react-dom';
import App from './App';
import { saveState } from './app/localStorage';
import { store } from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';

store.subscribe(() => {
  const state = store.getState();
  saveState({
    auth: {
      username: state.auth.username,
      token: state.auth.token,
      expires: state.auth.expires,
    },
    gameData: state.gameData,
    ui: state.ui,
  })
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
      <App />
      </DndProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('container')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
