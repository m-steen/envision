import React from 'react';
import { render } from 'react-dom';
import store from './AppState';
import App from './components/App';

import {newBmcModel, loadModels} from './commands';

//import { AppContainer } from 'react-hot-loader';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

function exportToJson() {
  const json = JSON.stringify(store.model);
  window.open('http://webtoolstudio.bizzdesign.com:3001/models/0', '_blank');
};

// for debug: set authentication with dummy values
//store.authenticated = {name: "De Bug", accessToken: "<access-token>"};

// debug: by default, open the open menu
//loadModels();

/*
const router = new Router({
    "/{kind}": (kind) => console.log("Kind: " + kind)
}).configure({
    notfound: () => console.log("No kind configured"),
    html5history: true
}).init();
*/

render(
  //<AppContainer>
    <App store={store}
      exportToJson={() => exportToJson()}/>
  //</AppContainer>,
  , document.getElementById('root')
);
