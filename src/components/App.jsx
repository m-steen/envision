import React from 'react';
import Canvas from './Canvas';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

const App = React.createClass({
  render: function() {
    return <Canvas />;
  }
});

export default DragDropContext(HTML5Backend)(App);
