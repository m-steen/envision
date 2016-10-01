import store from './AppState';
import 'whatwg-fetch';
import CanvasModel from './model/CanvasModel';
import CanvasBlock from './model/CanvasBlock';
import CanvasItem from './model/CanvasItem';

const server = window.location.hostname;
const port = '9000';

// positioning of the blocks:
// we use a maximum screen width of 1024 pixels (768 x 1024 resolution)
// this is the native resolution of iPads and seems to be a reasonable
// resolution that most screens and beamers can reach.
// if we make our blocks 200px wide, they'll fit in 1000px. Leaving
// 12px left and right.
// if we use the height, we have 768px. 100px are for the menu, so
// this leaves 668. Use height of 220px.

export function newBmcModel() {
  store.model = new CanvasModel('BMC', 'Your Business Model');
  // add BMC blocks
  store.model.blocks.push(new CanvasBlock('Key Partnerships',         12, 100, 200, 440));
  store.model.blocks.push(new CanvasBlock('Key Activities',          212, 100, 200, 220));
  store.model.blocks.push(new CanvasBlock('Key Resources',           212, 320, 200, 220));
  store.model.blocks.push(new CanvasBlock('Value & Services',        412, 100, 200, 440));
  store.model.blocks.push(new CanvasBlock('Customer Relationships',  612, 100, 200, 220));
  store.model.blocks.push(new CanvasBlock('Channels',                612, 320, 200, 220));
  store.model.blocks.push(new CanvasBlock('Customer Segments',       812, 100, 200, 440));
  store.model.blocks.push(new CanvasBlock('Cost Structure',           12, 540, 500, 220));
  store.model.blocks.push(new CanvasBlock('Revenue Structure',       512, 540, 500, 220));

  // add a dummy post it
  const postIt = new CanvasItem('Click to edit', 20, 50);
  store.model.blocks[6].postIts.push(postIt);
  //store.selection = postIt;
}

export function newSWOTModel() {
  store.model = new CanvasModel('SWOT', 'Your SWOT');
  // add SWOT blocks
  store.model.blocks.push(new CanvasBlock('Strengths',     256, 100, 300, 300));
  store.model.blocks.push(new CanvasBlock('Weaknesses',    556, 100, 300, 300));
  store.model.blocks.push(new CanvasBlock('Opportunities', 256, 400, 300, 300));
  store.model.blocks.push(new CanvasBlock('Threats',       556, 400, 300, 300));

  // add some initial items
  store.model.blocks[0].postIts.push(new CanvasItem('Click to edit', 20, 50));
  store.model.blocks[1].postIts.push(new CanvasItem('Click to edit', 20, 50));
  store.model.blocks[2].postIts.push(new CanvasItem('Click to edit', 20, 50));
  store.model.blocks[3].postIts.push(new CanvasItem('Click to edit', 20, 50));
}

export function newPESTLEModel() {
  store.model = new CanvasModel('PESTLE', 'PESTLE Analysis');
  // add PESTLE blocks
  store.model.blocks.push(new CanvasBlock('Political',        20, 100, 170, 600));
  store.model.blocks.push(new CanvasBlock('Economic',        190, 100, 170, 600));
  store.model.blocks.push(new CanvasBlock('Social/Cultural', 360, 100, 170, 600));
  store.model.blocks.push(new CanvasBlock('Technology',      530, 100, 170, 600));
  store.model.blocks.push(new CanvasBlock('Legal',           700, 100, 170, 600));
  store.model.blocks.push(new CanvasBlock('Environment',     870, 100, 170, 600));

}

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

function loadJson(uri, op, success, error) {
  if (store.authenticated) {
    const url = 'http://' + server + ':' + port + uri + "?accessToken=" + store.authenticated.accessToken;
    return fetch(url).then((response) => {
      if (response.ok) {
        return response.json()
          .then(success)
          .catch(ex => {
            console.log("Error");
            if (error) {
              error();
            }
            store.error = {
              title: "Unable to " + op,
              message: "The response from the server could not be processed",
              details: ex.toString()};
          });
      }
      else {
        if (error) {
          error();
        }
        store.error = communicationFailed(op, response);
      }
    }).catch(ex => {
      if (error) {
        error();
      }
      store.error = communicationFailed(op, null);
    });
  }
  else {
    if (error) {
      error();
    }
    store.error = notAuthenticated();
  }
};

export function loadModels() {
  store.openModelsDialog.open = true;
  loadJson('/api/models', 'load models',
      json => {
        if (store.openModelsDialog.open) {
          store.openModelsDialog.models = json
        }
      },
      () => store.openModelsDialog = {open: false, models: null});
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
