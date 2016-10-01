import React from 'react';
import { render } from 'react-dom';
//import { AppContainer } from 'react-hot-loader';
import store from './AppState';
import App from './components/App';

import {newBmcModel} from './commands';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


// newBmcModel();

render(
  //<AppContainer>
    <App store={store} />
  //</AppContainer>,
  , document.getElementById('root')
);
