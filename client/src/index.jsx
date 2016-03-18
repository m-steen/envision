import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducer';
import App from './components/App';

// should this be done here??
import {setState} from './action_creators';

// create the store
const store = createStore(reducer);

function reload() {
  fetch('http://localhost:3000/models/0')
  .then(function(response) {
    return response.json();
  }).then(function(json) {
    store.dispatch(setState(json));
  }).catch(function(ex) {
    console.log('parsing failed', ex);
  })
};

function save() {
  fetch('http://localhost:3000/models/0', {
  	method: 'put',
    headers: new Headers({
  		'Content-Type': 'application/json'
  	}),
    body: JSON.stringify(store.getState().toJSON())
  });
};

// mount and render the root component
ReactDOM.render(
  <Provider store={store}>
    <App reload={reload} save={save}/>
  </Provider>,
  document.getElementById('app')
);
