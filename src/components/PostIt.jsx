import React, {Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {DragSource} from 'react-dnd';
import {ItemTypes} from './Constants';

const postItSource = {
  beginDrag(props) {
    return {postItId: props.pid};
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
        width: width,
        height: height,
        border: '1px solid grey',
        backgroundColor: color
      }}>{title}</div>);
    /*connectDragSource(
      <g className="postIt" style={{
          cursor: 'move'
        }}>
        <rect x={x} y={y} width={width} height={height} style={{fill: color, strokeWidth: 1, stroke: 'rgb(0,0,0)'}}/>
      </g>);*/
  }
});

export default DragSource(ItemTypes.POSTIT, postItSource, collect)(PostIt);
//export default PostIt;
