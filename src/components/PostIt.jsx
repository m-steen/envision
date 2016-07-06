import React, {Component} from 'react';
import {observable, transaction, computed} from 'mobx';
import {observer} from 'mobx-react';
import {DraggableCore} from 'react-draggable';

@observer
class PostIt extends Component {
    render() {
    const {x, y, width, height, color, title} = this.props.postIt;

    let textX = x + 20;
    let textY = y + 20;
    let textW = width - 40;
    let textH = height - 40;

    // the post it represented in SVG
    return <DraggableCore onDrag={this.handleDrag}><div style={{
        position: 'absolute',
        left: x,
        top: y,
        width: width - 2, // 1px border on both sides
        height: height - 2, // 1px border on both sides
        border: '1px solid grey',
        backgroundColor: color
      }}
      onClick={(e) => this.onClick(e)}>{title}</div></DraggableCore>;
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
}

export default PostIt;
