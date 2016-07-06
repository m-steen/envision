import React from 'react';
import Container from './Container';
import PostIt from './PostIt';

const Canvas = React.createClass({
  render: function() {
    return <div style={{
      height: '100%',
      width: '100%'
    }}>
      {this.props.containers.map((container) => {
        const containerId = container.id;
        const postIts = container.postIts == undefined? [] : container.postIts;
        /*this.props.postIts.filter(postIt => {
          return postIt.container === containerId;
        });*/

        return <Container key={container.id}
          id={container.id}
          x={container.x}
          y={container.y}
          width={container.width}
          height={container.height}
          title={container.title}
          postIts={postIts} />;
      })}

    </div>;
  }
});

export default Canvas;
