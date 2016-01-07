import React from 'react';
import {DropTarget} from 'react-dnd';
import {ItemTypes} from './Constants';
import PostIt from './PostIt';

function getRelativeCoordinates(props, monitor) {
  const initialSourceOffset = monitor.getInitialSourceClientOffset();
  const initialOffset = monitor.getInitialClientOffset();
  const offset = monitor.getClientOffset();
  // coordinates are relative to their container. but the coordinates from dnd
  // are absolute, so we must translate them to relative container coordinates
  const x = offset.x - (initialOffset.x - initialSourceOffset.x) - props.x;
  const y = offset.y - (initialOffset.y - initialSourceOffset.y) - props.y;

  return {x: x, y: y};
}

const containerTarget = {
  canDrop: function (props, monitor) {
    const {x, y} = getRelativeCoordinates(props, monitor);
    const postItWidth = monitor.getItem().width;
    const postItHeight = monitor.getItem().height;
    return x > 0 &&
      y > 0 &&
      postItWidth + x < props.width &&
      postItHeight + y < props.height;
  },

  drop(props, monitor) {
    const containerId = props.id;
    const pid = monitor.getItem().pid;
    const {x, y} = getRelativeCoordinates(props, monitor);
    props.moveCard(pid, containerId, x, y);
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

const Container = React.createClass({
  render: function() {
    const {connectDropTarget} = this.props;
    return connectDropTarget(
      <div style={{
        position: 'absolute',
        left: this.props.x,
        top: this.props.y,
        height: this.props.height,
        width: this.props.width,
        border: '1px solid black'
      }}
      onDoubleClick={(e) => {
        const containerId = this.props.id;
        const x = e.clientX - this.props.x;
        const y = e.clientY - this.props.y;
        this.props.addCard(containerId, x, y, 130, 100, 'yellow', 'Note at ' + x + ',' + y)
      }
      }>
      <p>{this.props.title}</p>

      {this.props.postIts.map(postIt => {
        return <PostIt key={postIt.get('pid')}
                  pid={postIt.get('pid')}
                  x={postIt.get('x')}
                  y={postIt.get('y')}
                  width={postIt.get('width')}
                  height={postIt.get('height')}
                  color={postIt.get('color')}
                  title={postIt.get('title')} />;
      })}

    </div>);

  }
});

const DropContainer = DropTarget(ItemTypes.POSTIT, containerTarget, collect)(Container);

export default DropContainer;
