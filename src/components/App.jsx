import React from 'react';
import Canvas from './Canvas';
import Sidebar from './Sidebar';
import {guid} from '../AppState';

const App = React.createClass({
  render: function() {
    return <div>
        <a href="#" onClick={this.props.reload}>Load!</a> -
        <a href="#" onClick={this.props.save}>Save!</a>
        <Canvas containers={this.props.store.containers} onSelect={(object) => {
          this.props.store.selection = object;
        }}
        onAddPostIt={(container) => {
          container.postIts.push({pid: guid(), x: 50, y: 50, width: 100, height: 100, color: 'yellow', title: 'Post It!'})
        }}/>
        <Sidebar store={this.props.store}/>
      </div>;
  }
});

export default App;
