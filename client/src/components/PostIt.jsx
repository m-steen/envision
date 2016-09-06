import React, {Component} from 'react';
import ReactDOM from 'react-dom';
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

function handleDrop(fn, postIt, dragInfo) {
  setTimeout(() => fn(postIt, dragInfo.x, dragInfo.y, dragInfo.deltaX, dragInfo.deltaY), 1);
}

@observer
class PostIt extends Component {
  componentDidUpdate() {
    const selected = this.props.isSelected(this.props.postIt);
    if (selected) {
      ReactDOM.findDOMNode(this.refs.postItInput).focus();
    }
  }

  render() {
    const {x, y} = this.props;
    const {title, color, w, h} = this.props.postIt;

    let textX = x + 20;
    let textY = y + 20;
    let textW = w - 40;
    let textH = h - 40;

    // the post it represented in SVG
    const {connectDragSource} = this.props;
    const selected = this.props.isSelected(this.props.postIt);
    const dragHandleHeight = 20;

    const titleElem = selected?
      <textarea
          onChange={(e) => this.props.postIt.title = e.target.value}
          style={{width: (w - 8) + "px", height: (h - dragHandleHeight - 8) + "px"}}
          ref="postItInput"
          value={title}>
      </textarea> :
      <p>{title}</p>;

    return <div>
      <DraggableCore handle=".handle"
          onStart={(e, dragInfo) => this.props.onStartDragPostIt(this.props.postIt)}
          onDrag={(e, dragInfo) => handleDrag(this.props.postIt, dragInfo)}
          onStop={(e, dragInfo) => handleDrop(this.props.onDropPostIt, this.props.postIt, dragInfo)}>
        <Resizable height={h} width={w} minConstraints={[100, 50]} onResize={(event, {size}) => onResize(this.props.postIt, size)}>
          <div className={"postit " + color} style={{
              position: 'absolute',
              left: x,
              top: y,
              width: w - 2, // 1px border on both sides
              height: h - 2, // 1px border on both sides
              border: "1px solid black"
            }}
            onClick={(e) => { e.stopPropagation(); this.props.onSelect(this.props.postIt); }}>
            <div className="handle" style={{height: dragHandleHeight + "px"}}></div>
            {/*<a onClick={(e) => this.onDelete(e)}>X</a>*/}

            {titleElem}

          </div>
        </Resizable>
      </DraggableCore>
    </div>;
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
