import React, {Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

const PostIt = React.createClass({
  mixins: [PureRenderMixin],

  render: function() {
    console.log(this.props);

    const {x, y, width, height, color, title} = this.props;

    let textX = x + 20;
    let textY = y + 20;
    let textW = width - 40;
    let textH = height - 40;

    // the post it represented in SVG
    return <g className="postIt">
      <rect x={x} y={y} width={width} height={height} style={{fill: color, strokeWidth: 1, stroke: 'rgb(0,0,0)'}}/>
      <text x={textX} y={textY}>{title}</text>
    </g>;
  }
});

export default PostIt;
