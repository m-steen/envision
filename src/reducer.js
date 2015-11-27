import {Map, List} from 'immutable';
import {addCard} from './core';

const initialState = Map({
  title: 'Business Model Canvas',
  postIts: List()
});

export default function(state = initialState, action) {
  console.log('Reduce action of type ' + action.type);
  switch (action.type) {
    case 'ADD_CARD':
      const {x, y} = action;
      return addCard(state, x, y, 80, 80, 'yellow', 'text');
  }
  return state;
}
