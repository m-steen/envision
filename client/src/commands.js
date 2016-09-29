import store from './AppState';

const server = window.location.hostname;
const port = '9000';

export function reload() {
  if (store.authenticated) {
    const url = 'http://' + server + ':' + port + '/api/models/' + store.model.modelId + "?accessToken=" + store.authenticated.accessToken;
    fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      store.model = json;
    }).catch(function(ex) {
      console.log('parsing failed', ex);
    })
  }
};

export function save() {
  if (store.authenticated) {
    const json = JSON.stringify(store.model);
    const url = 'http://' + server + ':' + port + '/api/models/' + store.model.modelId + "?accessToken=" + store.authenticated.accessToken;
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
  }
};

export function exportToJson() {
  if (store.authenticated) {
    const json = JSON.stringify(store.model);
    const url = 'http://' + server + ':' + port + '/api/models/' + store.model.modelId + "?accessToken=" + store.authenticated.accessToken;
    window.open(url, '_blank');
  }
};
