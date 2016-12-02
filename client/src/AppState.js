import { observable, autorun } from 'mobx';
import { Router } from 'director';

// http://www.quirksmode.org/js/cookies.html
function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function authenticationInfo() {
  var userId = readCookie("userId");
  var secret = readCookie("secret");

  userId = userId || "691f9cd6dd826701x6a797679x15869400418x-371f";
  secret = secret || "728b0c53-9554-493a-b414-0f8e9787e713";

  if (userId && secret) {
    return {
      "userId": userId,
      "secret": secret
    };
  }
  else {
    return null;
  }
}

const initialModel = createNewModel('bmc');

const store = observable({
  model: initialModel,
  selection: null,
  dragging: null,
  showHelp: false,
  showBlockHelp: null,
  authenticated: authenticationInfo(),
  error: null,
  loadingModel: false,
  deleteModelDialog: {
    deleting: false,
    model: null
  },
  openModelsDialog: {
    open: false,
    models: null
  },
  snackbarMessage: null,

  showSaveModelDialog: false,
  savedModelJson: JSON.stringify(initialModel)
});

export function replaceNewModel(kind, title) {
  const model = createNewModel(kind, title);
  store.model = model;
  store.savedModelJson = JSON.stringify(model);
}

// set up routing
// routing will determine the kind of model that is being edited.
const router = Router({
  '/:kind': (kind) => {
    replaceNewModel(kind.toLowerCase());
  }
});
router.configure({
  notfound: () => { replaceNewModel('bmc'); }
});
router.init();

export function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

export function createNewModel(kind, title) {
  switch (kind) {
    case 'persona':
      return createPersonaModel(title || 'Your persona analysis');
    case 'swot':
      return createSWOTModel(title || 'Your SWOT analysis');
    case 'pestle':
      return createPESTLEModel(title || 'Your PESTLE analysis');
    default:
      return createBMCModel(title || 'Your business model');
  }
}

// positioning of the blocks:
// we use a maximum screen width of 1024 pixels (768 x 1024 resolution)
// this is the native resolution of iPads and seems to be a reasonable
// resolution that most screens and beamers can reach.
// if we make our blocks 200px wide, they'll fit in 1000px. Leaving
// 12px left and right.
// if we use the height, we have 768px. 100px are for the menu, so
// this leaves 668. Use height of 220px.

export function createPersonaModel(title) {
  return createModel(title, 'persona', [
    createBlock('Personality',              12, 100, 333, 330),
    createBlock('Pains',                   345, 100, 333, 330),
    createBlock('Goals',                   678, 100, 333, 330),
    createBlock('Interests',                12, 430, 333, 330),
    createBlock('Lifestyle',               345, 430, 333, 330),
    createBlock('Buying behaviour',        678, 430, 333, 330)
  ]);
}

export function createSWOTModel(title) {
  return createModel(title, 'swot', [
    createBlock('Strengths',                12, 100, 500, 330),
    createBlock('Weaknesses',              512, 100, 500, 330),
    createBlock('Opportunities',            12, 430, 500, 330),
    createBlock('Threats',                 512, 430, 500, 330)
  ]);
}

export function createPESTLEModel(title) {
  return createModel(title, 'pestle', [
    createBlock('Policical',                12, 100, 333, 330),
    createBlock('Economical',              345, 100, 333, 330),
    createBlock('Social',                  678, 100, 333, 330),
    createBlock('Technological',            12, 430, 333, 330),
    createBlock('Legal',                   345, 430, 333, 330),
    createBlock('Environmental',           678, 430, 333, 330)
  ]);
}

export function createBMCModel(title) {
  return createModel(title, 'bmc', [
    createBlock('Key Partnerships',         12, 100, 200, 440),
    createBlock('Key Activities',          212, 100, 200, 220),
    createBlock('Key Resources',           212, 320, 200, 220),
    createBlock('Value & Services',        412, 100, 200, 440),
    createBlock('Customer Relationships',  612, 100, 200, 220),
    createBlock('Channels',                612, 320, 200, 220),
    createBlock('Customer Segments',       812, 100, 200, 440, [
      createItem('Click to edit', 20, 50)
    ]),
    createBlock('Cost Structure',           12, 540, 500, 220),
    createBlock('Revenue Structure',       512, 540, 500, 220)
  ]);
}

// functions to create a model.
// each model consists of blocks, and
// helpers
export function createModel(title, kind, blocks = []) {
  return {
    modelId: guid(),
    kind: kind,
    date: null,
    title: title,
    blocks: blocks,
    postIts: []
  };
}

export function createBlock(title, x, y, w, h, postIts = []) {
  return {
    id: guid(),
    title: title,
    x: x,
    y: y,
    w: w,
    h: h,
    postIts: postIts
  };
}

export function createItem(title, x, y, w = 100, h = 60, color = 'yellow') {
  return {
    id: guid(),
    title: title,
    x: x,
    y: y,
    w: w,
    h: h,
    color: color
  };
}

export function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}


export function relativeCenterPoint(postIt) {
  return {
    x: postIt.x + (postIt.w / 2),
    y: postIt.y + (postIt.h / 2)
  };
}

export function toAbsolute(point, block) {
  return {
    x: block.x + point.x,
    y: block.y + point.y
  };
}

export function findBlockFor(model, postIt) {
  const blocks = model.blocks;
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    for (let j = 0; j < block.postIts.length; j++) {
      const p = block.postIts[j];
      if (p === postIt) {
        return block;
      }
    }
  }
  return model;
}




export function relativeCenterPoint(postIt) {
  return {
    x: postIt.x + (postIt.w / 2),
    y: postIt.y + (postIt.h / 2)
  };
}

export function toAbsolute(point, block) {
  return {
    x: block.x + point.x,
    y: block.y + point.y
  };
}

export function findBlockFor(model, postIt) {
  const blocks = model.blocks;
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    for (let j = 0; j < block.postIts.length; j++) {
      const p = block.postIts[j];
      if (p === postIt) {
        return block;
      }
    }
  }
  return model;
}

export function isPointInBlock(point, block) {
  const px = point.x;
  const py = point.y;
  const bx = block.x;
  const by = block.y;
  const {w, h} = block;

  return bx <= px && px <= bx + w &&
    by <= py && py <= by + h;
}

export function findBlockForPostItXY(model, postIt) {
  const containingBlock = findBlockFor(model, postIt);
  const point = toAbsolute(relativeCenterPoint(postIt), containingBlock);

  for (let i = 0; i < model.blocks.length; i++) {
    const block = model.blocks[i];
    if (isPointInBlock(point, block)) {
      return block;
    }
  }
  return model;
}

export function isOver(store, block) {
  if (!store.dragging) {
    return false;
  }

  const blockForPoint = findBlockForPostItXY(store.model, store.dragging);
  console.log("Dragging over " + blockForPoint.title);
  return blockForPoint === block;
}

export default store;
