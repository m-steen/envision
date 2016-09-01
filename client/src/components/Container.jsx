import React, {Component} from 'react';
import {DropTarget} from 'react-dnd';
import {ItemTypes} from './Constants';
import {observer} from 'mobx-react';
import PostIt from './PostIt';

const borderWidth = 2;

function getRelativeCoordinates(props, monitor) {
  const initialSourceOffset = monitor.getInitialSourceClientOffset();
  const initialOffset = monitor.getInitialClientOffset();
  const offset = monitor.getClientOffset();
  // coordinates are relative to their container. but the coordinates from dnd
  // are absolute, so we must translate them to relative container coordinates
  const x = offset.x - (initialOffset.x - initialSourceOffset.x) - props.block.x - borderWidth;
  const y = offset.y - (initialOffset.y - initialSourceOffset.y) - props.block.y - borderWidth;

  return {x: x, y: y};
}

const containerTarget = {
  canDrop: function (props, monitor) {
    const {x, y} = getRelativeCoordinates(props, monitor);
    const postIt = monitor.getItem().postIt;
    const postItWidth = postIt.w;
    const postItHeight = postIt.h;
    const block = props.block;

    return x > 0 &&
      y > 0 &&
      postItWidth + x < block.w &&
      postItHeight + y < block.h;
  },

  drop(props, monitor) {
    const initialSourceOffset = monitor.getInitialSourceClientOffset();
    const initialOffset = monitor.getInitialClientOffset();
    const offset = monitor.getClientOffset();
    // coordinates are relative to their container. but the coordinates from dnd
    // are absolute, so we must translate them to relative container coordinates

    const block = props.block;
    const postIt = monitor.getItem().postIt;
    const {x, y} = getRelativeCoordinates(props, monitor);
    props.onMovePostIt(postIt, block, x, y);
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
    const titleClass = block.title.replace(/ /g,'').toLowerCase();
    return connectDropTarget(
      <div className={"block " + titleClass} style={{
          position: 'absolute',
          left: block.x,
          top: block.y,
          width: block.w,
          height: block.h,
          border: borderWidth + 'px solid grey',
          boxSizing: 'border-box',
          backgroundColor: isOver ? 'lightgrey' : 'inherit'
        }}
        onClick={(e) => this.props.onSelect(null)}>
        <a onClick={this.onAdd}>+</a>
        <h1 style={{float: "topleft", fontFamily: "Verdana, Arial, SansSerif", fontWeight: "bold", paddingLeft: "10px", paddingRight: "40px"}}>
          {block.title}
        </h1>


      </div>);
  }

  onAdd = (e) => {
    this.props.onAddPostIt(this.props.block);
  }
}

export default DropTarget(ItemTypes.POSTIT, containerTarget, collect)(Container);
