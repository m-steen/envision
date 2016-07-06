import React from 'react';
import Canvas from './Canvas';

const App = React.createClass({
  render: function() {
    return <div>
        <a href="#" onClick={this.props.reload}>Load!</a> -
        <a href="#" onClick={this.props.save}>Save!</a>
        <Canvas containers={this.props.store.containers}/>
      </div>;
  }
});

export default App;
