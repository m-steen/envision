import React from 'react';
import PostIt from './PostIt';

const Container = React.createClass({

  render: function() {
    const {container} = this.props;
    const postIts = container.postIts;

    return <div style={{
        position: 'absolute',
        left: container.x,
        top: container.y,
        height: container.height,
        width: container.width,
        border: '1px solid black',
        backgroundColor: 'inherit'
      }}
      >
      <p>{container.title}</p>

      {postIts.map(postIt => 
        <PostIt key={postIt.pid} postIt={postIt} />
      )}

    </div>;

  }
});

export default Container;
