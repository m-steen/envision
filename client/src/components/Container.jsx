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
    const helpText = block.showHelp ? 
                     <div className="tooltip">{block.helpText}</div> : undefined;
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
        <a onClick={this.toggleHelp} onMouseOver={this.showHelp} onMouseOut={this.hideHelp}>?</a>
        <h1 style={{float: "topleft", fontFamily: "Verdana, Arial, SansSerif", fontWeight: "bold", paddingLeft: "10px", paddingRight: "40px"}}>
          {block.title}
        </h1>
        {helpText}


      </div>;
  }

  onAdd = (e) => {
    this.props.onAddPostIt(this.props.block);
  }

  toggleHelp = (e) => {
    this.props.block.showHelp = !this.props.block.showHelp;
  }
  showHelp = (e) => {
    this.props.block.showHelp = true;
  }
  hideHelp = (e) => {
    this.props.block.showHelp = false;
  }
}

export default Container;
