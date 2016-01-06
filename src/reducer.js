import {Map, List} from 'immutable';
import {addCard, moveCard} from './core';

const initialState = Map({
  title: 'Business Model Canvas',
  postIts: Map().set(
    1, Map({pid: 1, x: 100, y: 100, width: 200, height: 150, color: 'yellow', title: 'Oh my'})
  )
});

export default function(state = initialState, action) {
  switch (action.type) {
    case 'ADD_CARD': {
      const {x, y, width, height, color, title} = action;
      return addCard(state, x, y, width, height, color, title);
    }
    case 'MOVE_CARD': {
      const {pid, x, y} = action;
      return moveCard(state, pid, x, y);
    }
  }
  return state;
}
