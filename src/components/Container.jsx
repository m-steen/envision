import React from 'react';
import PostIt from './PostIt';

const Container = React.createClass({

  render: function() {
    return <div style={{
        position: 'absolute',
        left: this.props.x,
        top: this.props.y,
        height: this.props.height,
        width: this.props.width,
        border: '1px solid black',
        backgroundColor: 'inherit'
      }}
      >
      <p>{this.props.title}</p>

      {this.props.postIts.map(postIt => {
        return <PostIt key={postIt.pid}
                  pid={postIt.pid}
                  x={postIt.x}
                  y={postIt.y}
                  width={postIt.width}
                  height={postIt.height}
                  color={postIt.color}
                  title={postIt.title} />;
      })}

    </div>;

  }
});

export default Container;
