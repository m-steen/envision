import React from 'react';
import Container from './Container';
import PostIt from './PostIt';

const Canvas = React.createClass({
  render: function() {
    return <div style={{
      height: '100%',
      width: '100%'
    }}>
      {this.props.containers.map((container) => 
         <Container key={container.id} container={container}/>
      )}

    </div>;
  }
});

export default Canvas;
