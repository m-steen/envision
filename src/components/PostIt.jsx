import React, {Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
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

const PostIt = React.createClass({
  mixins: [PureRenderMixin],

  render: function() {
    const {connectDragSource} = this.props;
    const {x, y, width, height, color, title} = this.props;

    let textX = x + 20;
    let textY = y + 20;
    let textW = width - 40;
    let textH = height - 40;

    // the post it represented in SVG
    return connectDragSource(<div style={{
        position: 'absolute',
        left: x,
        top: y,
        width: width - 2, // 1px border on both sides
        height: height - 2, // 1px border on both sides
        border: '1px solid grey',
        backgroundColor: color
      }}>{title}</div>);
  }
});

export default DragSource(ItemTypes.POSTIT, postItSource, collect)(PostIt);
//export default PostIt;
