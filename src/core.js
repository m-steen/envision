import {Map, List} from 'immutable';

export function addCard(state, x, y, w, h, color, title) {
  return state.updateIn(['postIts'], (postIts) => {
    const nextId = postIts.reduce((reduction, value, key, iter) => Math.max(reduction, value.get('pid')), -1);
    return postIts.push(Map({pid: nextId + 1, x: x, y: y, width: w, height: h, color: color, text: title}));
  });
}
