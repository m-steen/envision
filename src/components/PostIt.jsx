import React, {Component} from 'react';
import {observable, transaction, computed} from 'mobx';
import {observer} from 'mobx-react';
import {DraggableCore} from 'react-draggable';

@observer
class PostIt extends Component {
    render() {
    const {title, color, x, y, w, h} = this.props.postIt;

    let textX = x + 20;
    let textY = y + 20;
    let textW = w - 40;
    let textH = h - 40;

    // the post it represented in SVG
    return <DraggableCore onDrag={this.handleDrag}><div style={{
        position: 'absolute',
        left: x,
        top: y,
        width: w - 2, // 1px border on both sides
        height: h - 2, // 1px border on both sides
        border: '0px solid grey',
        backgroundColor: color
      }}
      onClick={(e) => this.onClick(e)}>
      <a onClick={(e) => this.onDelete(e)} href="#" style={{float: "right"}}>x</a>
      <p style={{float: "left", fontFamily: "Verdana", fontSize: "10pt", padding: "5px"}}>{title}</p>
    </div></DraggableCore>;
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

export default PostIt;
