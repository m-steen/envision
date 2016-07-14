import React, {Component} from 'react';
import {DropTarget} from 'react-dnd';
import {ItemTypes} from './Constants';
import {observer} from 'mobx-react';
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
//    const {x, y} = getRelativeCoordinates(props, monitor);
//    const postItWidth = monitor.getItem().width;
//    const postItHeight = monitor.getItem().height;
//    return x > 0 &&
//      y > 0 &&
//      postItWidth + x < props.width &&
//      postItHeight + y < props.height;
    return true;
  },

  drop(props, monitor) {
    console.log("Yeah!");
//    const containerId = props.id;
//    const pid = monitor.getItem().pid;
//    const {x, y} = getRelativeCoordinates(props, monitor);
//    console.log("Drop " + pid + " on " + conainerId + " at (" + x + "," + y + ")");
//    props.moveCard(pid, containerId, x, y);
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

@observer
class Container extends Component {

  render() {
    const {connectDropTarget, isOver} = this.props;
    const block = this.props.block;
    const postIts = block.postIts;

    return connectDropTarget(
      <div style={{
          position: 'absolute',
          left: block.x,
          top: block.y,
          width: block.w,
          height: block.h,
          border: '3px solid grey',
          backgroundColor: isOver ? 'lightgrey' : 'inherit'
        }}
        onClick={(e) => this.props.onSelect(null)}>
        <p style={{float: "left", fontFamily: "Verdana", paddingLeft: "10px"}}>{block.title}</p>
        <a onClick={this.onAdd} style={{float: "right", fontSize: "2em", paddingRight: "10px"}}>+</a>

        {postIts.map(postIt =>
          <PostIt key={postIt.id} postIt={postIt} onSelect={this.props.onSelect} onDeletePostIt={this.props.onDeletePostIt}/>
        )}

      </div>);
  }

  onAdd = (e) => {
    this.props.onAddPostIt(this.props.block);
    console.log("Add a post it");
  }
}

export default DropTarget(ItemTypes.POSTIT, containerTarget, collect)(Container);
