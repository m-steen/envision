import React from 'react';
import Canvas from './Canvas';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

const App = React.createClass({
  render: function() {
    return <div>
        <a href="#" onClick={this.props.reload}>Load!</a> -
        <a href="#" onClick={this.props.save}>Save!</a>
        <Canvas />
      </div>;
  }
});

export default DragDropContext(HTML5Backend)(App);
