import React from 'react';
import {DropTarget} from 'react-dnd';
import {ItemTypes} from './Constants';

const containerTarget = {
  drop(props, monitor) {
    console.log("Drop in container " + props.title);
    const pid = monitor.getItem().postItId;
    const initialSourceOffset = monitor.getInitialSourceClientOffset();
    const initialOffset = monitor.getInitialClientOffset();
    const offset = monitor.getClientOffset();
    const x = offset.x - (initialOffset.x - initialSourceOffset.x);
    const y = offset.y - (initialOffset.y - initialSourceOffset.y);
    props.moveCard(pid, x, y);
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
    return connectDropTarget(<div style={{
      position: 'absolute',
      left: this.props.x,
      top: this.props.y,
      height: this.props.height,
      width: this.props.width,
      border: '1px solid black'
    }}>
      <p>{this.props.title}</p>
    </div>);

  }
});

const DropContainer = DropTarget(ItemTypes.POSTIT, containerTarget, collect)(Container);

export default DropContainer;
