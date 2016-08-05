import React from 'react';
import { render } from 'react-dom';
//import { AppContainer } from 'react-hot-loader';
import store from './AppState';
import App from './components/App';

render(
  //<AppContainer>
    <App store={store} />
  //</AppContainer>,
  , document.getElementById('root')
);

/*if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;

    render(
      <AppContainer>
        <NextApp appState={appState} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}*/
