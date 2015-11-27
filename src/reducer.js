import {Map, List} from 'immutable';
import {addCard} from './core';

const initialState = Map({
  title: 'Business Model Canvas',
  postIts: List()
});

export default function(state = initialState, action) {
  switch (action.type) {
    case 'ADD_CARD':
      const {x, y, width, height, color, title} = action;
      return addCard(state, x, y, width, height, color, title);
  }
  return state;
}
