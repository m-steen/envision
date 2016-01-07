import {Map, List} from 'immutable';

export function addCard(state, x, y, w, h, color, title) {
  return state.updateIn(['postIts'], (postIts) => {
    const nextId = postIts.reduce((reduction, value, key, iter) => Math.max(reduction, value.get('pid')), -1);
    const pid = nextId + 1;
    return postIts.set(pid, Map({pid: pid, x: x, y: y, width: w, height: h, color: color, title: title}));
  });
}

export function moveCard(state, pid, container, x, y) {
  if (state.hasIn(['postIts', pid])) {
    return state.updateIn(['postIts', pid], (postIt) => {
      return postIt.merge(Map({container: container, x: x, y: y}));
    });
  }
  else {
    return state;
  }
}
