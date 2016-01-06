import {Map, List} from 'immutable';
import {addCard, moveCard} from './core';

const initialState = Map({
  title: 'Business Model Canvas',
  postIts: Map().set(
    1, Map({pid: 1, x: 100, y: 100, width: 200, height: 150, color: 'yellow', title: 'Oh my'})
  ),
  containers: Map({
    1: Map({id: 1, x:  50, y:  50, width: 200, height: 500, title: 'Key Partners'}),
    2: Map({id: 2, x: 250, y:  50, width: 200, height: 250, title: 'Key Activities'}),
    3: Map({id: 3, x: 250, y: 300, width: 200, height: 250, title: 'Key Resources'}),
    4: Map({id: 4, x: 450, y:  50, width: 200, height: 500, title: 'Value Propositions'}),
    5: Map({id: 5, x: 650, y:  50, width: 200, height: 250, title: 'Customer Relationships'}),
    6: Map({id: 6, x: 650, y: 300, width: 200, height: 250, title: 'Channels'}),
    7: Map({id: 7, x: 850, y:  50, width: 200, height: 500, title: 'Customer Segments'}),
    8: Map({id: 8, x:  50, y: 550, width: 500, height: 250, title: 'Cost Structure'}),
    9: Map({id: 9, x: 550, y: 550, width: 500, height: 250, title: 'Revenue Streams'})
  })
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
