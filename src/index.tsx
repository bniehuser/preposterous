import React from 'react';
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
  })
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('container')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
