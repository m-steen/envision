import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {observable, transaction, computed} from 'mobx';
import {observer} from 'mobx-react';
import {Resizable} from 'react-resizable';
import {DraggableCore} from 'react-draggable';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

@observer
class PostItToolbar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }


  handleTouchTap = (event) => {
    // This prevents ghost click.
    event.preventDefault();
    event.stopPropagation();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

//           <a onClick={(e) => this.props.onChangeColor(e, "pink")} className="color-button pink"></a>

  render() {
    const {x, y, selectedColor} = this.props;

    return <div className="toolbar" style={{
          position: 'absolute',
          left: x,
          top: y
        }}>
        <div>
          <a className="color-button handle" onClick={(e) => e.stopPropagation()}><i className="fa fa-arrows" style={{fontSize: "18px", padding: "1px", width: "18px", textAlign: "center", cursor: "pointer"}}></i></a>
          <a className="color-button" onClick={(e) => this.props.onDuplicatePostIt(e)}><i className="fa fa-files-o" style={{fontSize: "18px", padding: "1px", width: "18px", textAlign: "center", cursor: "pointer"}}></i></a>
          <a className="color-button" onClick={(e) => this.props.onDelete(e)}><i className="fa fa-trash-o" style={{fontSize: "18px", padding: "1px", width: "18px", textAlign: "center", cursor: "pointer"}}></i></a>
          <a className="color-button" onClick={this.props.onMoveToFront}><img src="resources/bring-forward.svg" style={{padding: "1px", width: "18px", height: "18px", border: "0"}}/></a>
          <a className="color-button" onClick={this.props.onMoveToBack}><img src="resources/bring-backward.svg" style={{padding: "1px", width: "18px", height: "18px", border: "0"}}/></a>
          <a onClick={this.handleTouchTap} className={"color-button " + selectedColor}></a>
        </div>

        <Popover
          className="toolbar-color-dropdown"
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleRequestClose}>

          <Menu>
            <MenuItem className="color-button orange" primaryText="" onClick={(e) => this.props.onChangeColor(e, "orange")}/>
            <MenuItem className="color-button blue" primaryText="" onClick={(e) => this.props.onChangeColor(e, "blue")}/>
            <MenuItem className="color-button yellow" primaryText="" onClick={(e) => this.props.onChangeColor(e, "yellow")}/>
            <MenuItem className="color-button green" primaryText="" onClick={(e) => this.props.onChangeColor(e, "green")}/>
            <MenuItem className="color-button pink" primaryText="" onClick={(e) => this.props.onChangeColor(e, "Pink")}/>
          </Menu>
        </Popover>
      </div>;
  }

}

export default PostItToolbar;
