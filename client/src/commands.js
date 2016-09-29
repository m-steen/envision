import store from './AppState';
import 'whatwg-fetch';

const server = window.location.hostname;
const port = '9000';

function notAuthenticated() {
  return {
    title: "Not authenticated",
    message: "You are not authenticated.",
    details: "Before you can open or save your work, you must be logged in. Please login first, via the login option in the menu"
  };
}

function communicationFailed(op, response) {
  return {
    title: "Could not " + op,
    message: response? "The server responded with an error message." : "The server could not be reached",
    details: response? "Response message: " + response.statusText + " (code: " + response.status + ")" : null
  }
}
export function reload() {
  if (store.authenticated) {
    const url = 'http://' + server + ':' + port + '/api/models/' + store.model.modelId + "?accessToken=" + store.authenticated.accessToken;
    fetch(url).then((response) => {
      if (response.ok) {
        return response.json()
          .then(json => store.model = json)
          .catch(ex => {
            store.error = {
              title: "Unable to load model",
              message: "The response from the server could not be processed",
              details: ex.toString()};
          });
      }
      else {
        store.error = communicationFailed("load model", response);
      }
    }).catch(ex => store.error = communicationFailed("load model", null));
  }
  else {
    store.error = notAuthenticated();
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
      if (!response.ok) {
        store.error = communicationFailed("save model", response);
      }
    }).catch(ex => store.error = communicationFailed("save model", null));
  }
  else {
    store.error = notAuthenticated();
  }
};

export function exportToJson() {
  if (store.authenticated) {
    const json = JSON.stringify(store.model);
    const url = 'http://' + server + ':' + port + '/api/models/' + store.model.modelId + "?accessToken=" + store.authenticated.accessToken;
    window.open(url, '_blank');
  }
  else {
    store.error = notAuthenticated();
  }
};
