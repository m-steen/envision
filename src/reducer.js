import {Map, List} from 'immutable';

const initialState = Map({
  title: 'Business Model Canvas',
  postIts: List.of(
    Map({pid: 0, x: 300, y: 300, width: 250, height: 150, color: "blue", text: "Movie stuff"}),
    Map({pid: 1, x: 500, y: 300, width: 150, height: 150, color: "yellow", text: "Movie stuff"}),
    Map({pid: 2, x: 700, y: 300, width: 150, height: 150, color: "yellow", text: "Movie stuff"}),
    Map({pid: 3, x: 400, y: 100, width: 150, height: 150, color: "yellow", text: "Test stuff"})
  )
});

export default function(state = initialState, action) {
  switch (action.type) {
    case 'SET_STATE':
      return state;
  }
  return state;
}
