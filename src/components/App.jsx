import React from 'react';
import Canvas from './Canvas';
import Sidebar from './Sidebar';

const App = React.createClass({
  render: function() {
    return <div>
        <a href="#" onClick={this.props.reload}>Load!</a> -
        <a href="#" onClick={this.props.save}>Save!</a>
        <Canvas containers={this.props.store.containers} onSelect={(object) => {
          this.props.store.selection = object;
        }}/>
        <Sidebar store={this.props.store}/>
      </div>;
  }
});

export default App;
