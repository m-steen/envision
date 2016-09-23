import store from './AppState';

const server = window.location.hostname;
const port = '9000';

export function reload() {
  const url = 'http://' + server + ':' + port + '/api/models/' + store.model.modelId;
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
  const url = 'http://' + server + ':' + port + '/api/models/' + store.model.modelId;
  fetch(url, {
  	method: 'put',
    headers: new Headers({
  		'Content-Type': 'application/json'
  	}),
    body: json
  }).then((response) => {
    //const location = response.headers.Location;
    console.log(response);
  });
};

export function exportToJson() {
  const json = JSON.stringify(store.model);
  const url = 'http://' + server + ':' + port + '/models/0';
  window.open(url, '_blank');
};
