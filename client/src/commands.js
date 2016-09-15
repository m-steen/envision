import store from './AppState';

const server = 'webtoolstudio.bizzdesign.com';
const port = '3001';

export function reload() {
  const url = 'http://' + server + ':' + port + '/models/0';
  fetch(url)
  .then(function(response) {
    return response.json();
  }).then(function(json) {
    store.model = json;
  }).catch(function(ex) {
    console.log('parsing failed', ex);
  })
};

export function save() {
  const json = JSON.stringify(store.model);
  const url = 'http://' + server + ':' + port + '/models/0';
  fetch(url, {
  	method: 'put',
    headers: new Headers({
  		'Content-Type': 'application/json'
  	}),
    body: json
  });
};

export function exportToJson() {
  const json = JSON.stringify(store.model);
  const url = 'http://' + server + ':' + port + '/models/0';
  window.open(url, '_blank');
};

