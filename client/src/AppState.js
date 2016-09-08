import { observable } from 'mobx';
import bmcModel from './model/bmcModel';
import bmcPostIt from './model/bmcPostIt';

const store = observable({
  model: new bmcModel('Business Model Canvas'),
  selection: null,
  dragging: null
});

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
  return null;
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
