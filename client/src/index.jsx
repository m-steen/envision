import React from 'react';
import { render } from 'react-dom';
//import { AppContainer } from 'react-hot-loader';
import store from './AppState';
import App from './components/App';

import bmcPostIt from './model/bmcPostIt';
import {newBmcModel, loadModels} from './commands';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

function reload() {
  fetch('http://webtoolstudio.bizzdesign.com:3001/models/0')
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
  fetch('http://webtoolstudio.bizzdesign.com:3001/models/0', {
  	method: 'put',
    headers: new Headers({
  		'Content-Type': 'application/json'
  	}),
    body: json
  });
};

function exportToJson() {
  const json = JSON.stringify(store.model);
  window.open('http://webtoolstudio.bizzdesign.com:3001/models/0', '_blank');
};

// for debug: set authentication with dummy values
//store.authenticated = {name: "De Bug", accessToken: "<access-token>"};

// debug: by default, open the open menu
//loadModels();

newBmcModel();

render(
  //<AppContainer>
    <App store={store}
      save={() => save()}
      reload={() => reload()}
      exportToJson={() => exportToJson()}/>
  //</AppContainer>,
  , document.getElementById('root')
);
