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
  const x = offset.x - (initialOffset.x - initialSourceOffset.x) - props.block.x;
  const y = offset.y - (initialOffset.y - initialSourceOffset.y) - props.block.y;

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

    return connectDropTarget(
      <div style={{
          position: 'absolute',
          left: block.x,
          top: block.y,
          width: block.w,
          height: block.h,
          border: '1px solid grey',
          backgroundColor: isOver ? 'lightgrey' : 'inherit'
        }}
        onClick={(e) => this.props.onSelect(null)}>
        <button type="button" className="add-button tooltip" style={{float: "right"}}
          onClick={this.onAdd} >+<span className="tooltiptext">Add a new item to the {block.title}</span></button>
        <p style={{float: "topleft", fontFamily: "Verdana, Arial, SansSerif", fontWeight: "bold", paddingLeft: "10px", paddingRight: "40px"}}>{block.title}</p>

        {postIts.map(postIt =>
          <PostIt key={postIt.id} postIt={postIt} onSelect={this.props.onSelect} onDeletePostIt={this.props.onDeletePostIt}/>
        )}

      </div>);
  }

  onAdd = (e) => {
    this.props.onAddPostIt(this.props.block);
  }
}

export default DropTarget(ItemTypes.POSTIT, containerTarget, collect)(Container);
