import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {PostIt} from './PostIt';
import IconButton from 'material-ui/IconButton';
import HelpIcon from 'material-ui/svg-icons/action/help';

const borderWidth = 2;

@observer
class Container extends Component {

  render() {
    const block = this.props.block;
    const postIts = block.postIts;
    const titleClass = block.title.replace(/ /g,'').toLowerCase();
    const helpText = this.props.showHelp ?
                     <div className="tooltiptext">{this.props.help}</div> : undefined;
    return <div className={"block " + titleClass} style={{
          position: 'absolute',
          left: block.x,
          top: block.y,
          width: block.w + borderWidth,
          height: block.h + borderWidth,
          border: borderWidth + 'px solid grey',
          boxSizing: 'border-box',
          backgroundColor: 'inherit'
        }}
        onDoubleClick={(e) => this.props.onAddPostIt(this.props.block, e.pageX, e.pageY)}
        onClick={(e) => this.props.onSelect(null)}>
        <div style={{ width: "100%" }}>
          <div style={{float: "right"}}>
            <IconButton iconClassName="fa fa-question-circle"
              style={{padding: "4px", width: "32px", height: "32px", fontSize: "24px", color: "#898989"}}
              onClick={this.toggleHelp} onMouseOver={this.showHelp} onMouseOut={this.hideHelp}/>
            <IconButton iconClassName="fa fa-plus-circle addbutton"
              style={{padding: "4px", width: "32px", height: "32px", fontSize: "24px", color: "#01789E"}}
              onClick={this.onAdd} onDoubleClick={(e) => e.stopPropagation()}>
              <span className="tooltip">Add a new item</span>
            </IconButton>
          </div>
          <h1 style={{float: "left", width: "60%"}}>{block.title}</h1>
        </div>
        {helpText}

      </div>;
  }

  onAdd = (e) => {
    this.props.onAddPostIt(this.props.block);
  }

  toggleHelp = (e) => {
    if (this.props.showHelp) {
      this.props.onHideHelp();
    }
    else {
      this.props.onShowHelp();
    }
  }

  showHelp = (e) => {
    this.props.onShowHelp();
  }

  hideHelp = (e) => {
    this.props.onHideHelp();
  }
}

export default Container;
