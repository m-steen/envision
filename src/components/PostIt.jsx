import React, {Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

const PostIt = React.createClass({
  mixins: [PureRenderMixin],

  render: function() {
    console.log(this.props);

    let x = this.props.x;
    let y = this.props.y;
    let w = this.props.width;
    let h = this.props.height;

    let textX = x + 20;
    let textY = y + 20;
    let textW = w - 40;
    let textH = h - 40;
    let color = this.props.color;

    // the post it represented in SVG
    return <g>
      <rect x={x} y={y} width={w} height={h} style={{fill: color, strokeWidth: 1, stroke: 'rgb(0,0,0)'}}/>
    </g>;
  }
});

export default PostIt;
