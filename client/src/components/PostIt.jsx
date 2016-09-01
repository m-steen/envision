import React, {Component} from 'react';
import {observable, transaction, computed} from 'mobx';
import {observer} from 'mobx-react';
import {Resizable} from 'react-resizable';
import {DraggableCore} from 'react-draggable';
import {DragSource} from 'react-dnd';
import {ItemTypes} from './Constants';

const postItSource = {
  beginDrag(props) {
    return props;
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

function onResize(postIt, size) {
  postIt.w = size.width;
  postIt.h = size.height;
}

function handleDrag(postIt, dragInfo) {
  //       transaction(() => {

  postIt.x += dragInfo.deltaX;
  postIt.y += dragInfo.deltaY;
}

@observer
class PostIt extends Component {
  render() {
    const {x, y} = this.props;
    const {title, color, w, h} = this.props.postIt;

    let textX = x + 20;
    let textY = y + 20;
    let textW = w - 40;
    let textH = h - 40;

    // the post it represented in SVG
    const {connectDragSource} = this.props;
    //return //connectDragSource(
    return <DraggableCore handle=".handle"
        onStart={(e, dragInfo) => this.props.onStartDragPostIt(this.props.postIt)}
        onDrag={(e, dragInfo) => handleDrag(this.props.postIt, dragInfo)}
        onStop={(e, dragInfo) => this.props.onDropPostIt(this.props.postIt, dragInfo.x, dragInfo.y)}>
      <div ref={(ref) => this.postItNode = ref}>
      <Resizable height={h} width={w} onResize={(event, {size}) => onResize(this.props.postIt, size)}>
      <div className={"postit " + color} style={{
          position: 'absolute',
          left: x,
          top: y,
          width: w - 2, // 1px border on both sides
          height: h - 2, // 1px border on both sides
          border: "1px solid black"
        }}
        onClick={(e) => {e.stopPropagation();
        this.props.onSelect(this.props.postIt);}}>
        <div className="handle">DRAG</div>
        <a onClick={(e) => this.onDelete(e)}>X</a>
        <p>{title}</p>
      </div>
    </Resizable>
  </div>
    </DraggableCore>;
  }

  onClick(e) {
    e.stopPropagation();
    this.props.onSelect(this.props.postIt);
  }

  onDelete(e) {
    e.stopPropagation();
    const postIt = this.props.postIt;
    this.props.onDeletePostIt(postIt);
  }
}

export default DragSource(ItemTypes.POSTIT, postItSource, collect)(PostIt);
