import store, {replaceNewModel, replaceTemplateModel, guid} from './AppState';
import 'whatwg-fetch';
//import isEqual from 'lodash.isequal';
import cloneDeep from 'lodash.cloneDeep';

const server = window.location.hostname;
const port = '9000';

function queryParam(store, params = {}) {
  const extraParams = Object.keys(params).length > 0;
  return store.authenticated?
    "?userId=" + store.authenticated.userId + "&secret=" + store.authenticated.secret +
      (extraParams? "&" + paramsToString(params) : "") :
    "?" + paramsToString(params);
}

function paramsToString(params) {
  return Object.keys(params).reduce((previous, key, i) => previous + (i > 0? "&" : "") + key + "=" + params[key], "");
}

function notAuthenticated() {
  return {
    title: "Not authenticated",
    message: "You are not authenticated.",
    details: "Before you can open or save your work, you must be logged in. Please login first, via the login option in the menu"
  };
}

function errorObject(op, message, details) {
  return {
    title: "Could not " + op,
    message: message,
    details: details
  }
}

function communicationFailed(op, response, reject) {
  if (response) {
    response.text().then(text => {
      console.log("Resolved " + text);
      const details = "Response message: " + response.statusText +
        " (code: " + response.status + "). " +
        (text? text : "");
      store.error = errorObject(op, "The server responded with an error message.", details);
      if (reject) {
        reject();
      }
    }).catch(ex => {
      if (reject) {
        reject();
      }
    });
  }
  else {
    store.error = errorObject(op, "The server could not be reached", null);
    if (reject) {
      reject();
    }
  }
}

function loadJson(uri, op, success, error, params = {}, requireAuth = true, showErrors = true) {
  if (!requireAuth || store.authenticated) {
    const url = 'http://' + server + ':' + port + uri + queryParam(store, params);
    return fetch(url).then((response) => {
      if (response.ok) {
        return response.json()
          .then(success)
          .catch(ex => {
            if (error) {
              error();
            }
            if (showErrors) {
              store.error = {
                title: "Unable to " + op,
                message: "The response from the server could not be processed",
                details: ex.toString()};
            }
          });
      }
      else {
        if (error) {
          error();
        }
        if (showErrors) {
          communicationFailed(op, response);
        }
      }
    }).catch(ex => {
      if (error) {
        error();
      }
      if (showErrors) {
        communicationFailed(op, null);
      }
    });
  }
  else {
    if (error) {
      error();
    }
    if (showErrors) {
      store.error = notAuthenticated();
    }
  }
};

export function loadModels() {
  store.openModelsDialog.open = true;
  loadJson('/api/models', 'load models',
      json => {
        if (store.openModelsDialog.open) {
          store.openModelsDialog.models = json.sort((a, b) => {
            const dateA = a.date? Date.parse(a.date) : 0;
            const dateB = b.date? Date.parse(b.date) : 0;
            return dateB - dateA;
          });
        }
      },
      () => store.openModelsDialog = {open: false, models: null},
      {kind: store.model.kind});
}

export function loadModel(id) {
  store.loadingModel = true;
  loadJson('/api/models/' + id, 'load model',
      json => {
        // only if we are loading
        if (store.loadingModel) {
          store.model = json;
          store.loadingModel = false;
        }
      },
      err => store.loadingModel = false);
}

export function saveACopyDialog() {
  if (store.authenticated) {
    store.showSaveCopyDialog.open = true;
    store.showSaveCopyDialog.title = store.model.title || "";
  }
  else {
    store.error = notAuthenticated();
  }
}

export function saveACopy(title) {
  const origId = store.model.modelId;
  const origTitle = store.model.title;

  store.model.modelId = guid();
  store.model.title = title;
  save().catch(() => {
    store.model.modelId = origId;
    store.model.title = origTitle;
  });
}

export function save() {
  return new Promise((resolve, reject) => {

    if (store.authenticated) {
      // remember the current date, if the save fails we can set it back
      const currentDate = store.model.date;
      store.model.date = new Date().toISOString();

      const json = JSON.stringify(store.model);
      const url = 'http://' + server + ':' + port + '/api/models/' + store.model.modelId + queryParam(store);
      fetch(url, {
      	method: 'put',
        headers: new Headers({
      		'Content-Type': 'application/json'
      	}),
        body: json
      }).then((response) => {
        if (!response.ok) {
          communicationFailed("save model", response, reject);
          store.model.date = currentDate;
        }
        else {
          store.snackbarMessage = "Model saved!";
          store.savedModelJson = JSON.stringify(store.model);
          resolve();
        }
      }).catch(ex => {
        communicationFailed("save model", null, reject);
        store.model.date = currentDate;
      });
    }
    else {
      store.error = notAuthenticated();
      reject();
    }
  })
};

export function deleteModel() {
  store.deleteModelDialog.deleting = true;
  const model = store.deleteModelDialog.model;
  if (store.authenticated) {
    const url = 'http://' + server + ':' + port + '/api/models/' + model.id + queryParam(store);
    fetch(url, {
    	method: 'delete'
    }).then((response) => {
      if (!response.ok) {
        communicationFailed("delete model", response);
      }
      else if (store.openModelsDialog.open) {
        loadModels();
      }
      store.deleteModelDialog.model = null;
      store.deleteModelDialog.deleting = false;
    }).catch(ex => fcommunicationFailed("delete model", null));
  }
  else {
    store.error = notAuthenticated();
  }
};

export function initiateNewModel() {
  const modelJson = JSON.stringify(store.model);
  const savedJson = store.savedModelJson;

  // compare json. if the two are not equal, then we have a different model.
  // if so, we want the user to save their changes. otherwise, we can just
  // create a new model.
  if (modelJson !== savedJson) {
    store.showSaveModelDialog = true;
  }
  else {
    saveAndCreateNewModel(false);
  }
}

export function saveAndCreateNewModel(doSave) {
  if (doSave) {
    save().then(loadTemplates);
  }
  else {
    loadTemplates();
  }
}

function loadTemplates() {
  store.openTemplatesDialog.open = true;
  loadJson('/api/templates', 'load templates',
      json => {
        if (store.openTemplatesDialog.open) {
          store.openTemplatesDialog.models = json.sort((a, b) => {
            if (a.title < b.title) return -1;
            if (a.title > b.title) return 1;
            return 0;
          });
        }
      },
      () => {
        store.openTemplatesDialog.models = [];
        store.openTemplatesDialog.failedToLoad = true;
      },
      {kind: store.model.kind},   // options
      false,                      // require auth
      false);                     // show errors
}

export function loadTemplate(id) {
  store.loadingTemplate = true;
  loadJson('/api/templates/' + id, 'load model',
      json => {
        // only if we are loading
        if (store.loadingTemplate) {
          replaceTemplateModel(json);
          store.loadingTemplate = false;
        }
      },
      err => store.loadingTemplate = false,
      {},       // options
      false);   // require auth
}

export function exportToJson() {
  store.showExportModelDialog = true;
};
