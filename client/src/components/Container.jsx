import React, {Component} from 'react';
import {observer} from 'mobx-react';
import PostIt from './PostIt';
import IconButton from 'material-ui/IconButton';
import HelpIcon from 'material-ui/svg-icons/action/help';

const borderWidth = 2;

@observer
class Container extends Component {

  render() {
    const block = this.props.block;
    const postIts = block.postIts;
    const titleClass = block.title.replace(/ /g,'').toLowerCase();
    const helpText = block.helpText;
    const tooltip = block.showHelp ? 
                     <div className="tooltiptext">{helpText}</div> : undefined;
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
        <div style={{ width: "100%" }}>
          <div style={{float: "right"}}>
            <IconButton iconClassName="fa fa-question-circle" 
              style={{padding: "4px", width: "32px", height: "32px", fontSize: "24px", color: "#424242"}}
              onClick={this.toggleHelp} onMouseOver={this.showHelp} onMouseOut={this.hideHelp}/>
            <IconButton iconClassName="fa fa-plus-circle" tooltip="Add a new post-it" tooltipPosition="bottom-right"
              style={{padding: "4px", width: "32px", height: "32px", fontSize: "24px", cursor: "pointer", color: "#424242"}} 
              onClick={this.onAdd} onDoubleClick={(e) => e.stopPropagation()}/>
          </div>
          <h1 style={{float: "left", width: "60%"}}>{block.title}</h1>
        </div>
        {tooltip}

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
