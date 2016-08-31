import React from 'react';
import { render } from 'react-dom';
//import { AppContainer } from 'react-hot-loader';
import store from './AppState';
import App from './components/App';

function reload() {
  fetch('http://localhost:3001/models/0')
  .then(function(response) {
    return response.json();
  }).then(function(json) {
    store.model = json;
  }).catch(function(ex) {
    console.log('parsing failed', ex);
  })
};

function save() {
  const json = JSON.stringify(store.model);
  fetch('http://localhost:3001/models/0', {
  	method: 'put',
    headers: new Headers({
  		'Content-Type': 'application/json'
  	}),
    body: json
  });
};

render(
  //<AppContainer>
    <App store={store}
      save={() => save()}
      reload={() => reload()}/>
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
