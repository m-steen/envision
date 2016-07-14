import React, {Component} from 'react';
import {observable, transaction, computed} from 'mobx';
import {observer} from 'mobx-react';

import {DragSource} from 'react-dnd';
import {ItemTypes} from './Constants';

import {DraggableCore} from 'react-draggable';

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

@observer
class PostIt extends Component {
    render() {
    const {title, color, x, y, w, h} = this.props.postIt;

    let textX = x + 20;
    let textY = y + 20;
    let textW = w - 40;
    let textH = h - 40;

    // the post it represented in SVG
    const {connectDragSource} = this.props;
    return connectDragSource(
      <div className="postit" style={{
          position: 'absolute',
          left: x,
          top: y,
          width: w - 2, // 1px border on both sides
          height: h - 2, // 1px border on both sides
          backgroundColor: color
        }}
        onClick={(e) => this.onClick(e)}>
        <button type="button" className="delete-button tooltip" 
          onClick={(e) => this.onDelete(e)} style={{float: "right"}}>X<span className="tooltiptext">Remove {title}</span></button>
        <p style={{float: "left", fontFamily: "Verdana", fontSize: "10pt", padding: "5px"}}>{title}</p>
      </div>);
  }

  onClick(e) {
    e.stopPropagation();
    this.props.onSelect(this.props.postIt);
  }

  handleDrag = (e, dragInfo) => {
      transaction(() => {
          this.props.postIt.x += dragInfo.deltaX;
          this.props.postIt.y += dragInfo.deltaY;
      });
  }

  onDelete(e) {
    e.stopPropagation();
    const postIt = this.props.postIt;
    this.props.onDeletePostIt(postIt);
  }
}

export default DragSource(ItemTypes.POSTIT, postItSource, collect)(PostIt);
