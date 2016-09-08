import React, {Component} from 'react';
import {observer} from 'mobx-react';
import PostIt from './PostIt';

const borderWidth = 2;

@observer
class Container extends Component {

  render() {
    const block = this.props.block;
    const postIts = block.postIts;
    const titleClass = block.title.replace(/ /g,'').toLowerCase();
    return <div className={"block " + titleClass} style={{
          position: 'absolute',
          left: block.x,
          top: block.y,
          width: block.w,
          height: block.h,
          border: borderWidth + 'px solid grey',
          boxSizing: 'border-box',
          backgroundColor: 'inherit'
        }}
        onDoubleClick={(e) => this.props.onAddPostIt(this.props.block, e.pageX, e.pageY)}
        onClick={(e) => this.props.onSelect(null)}>
        <a onClick={this.onAdd}
          onDoubleClick={(e) => e.stopPropagation()}>+</a>
        <h1 style={{float: "topleft", fontFamily: "Verdana, Arial, SansSerif", fontWeight: "bold", paddingLeft: "10px", paddingRight: "40px"}}>
          {block.title}
        </h1>
      </div>;
  }

  onAdd = (e) => {
    this.props.onAddPostIt(this.props.block);
  }
}

export default Container;
