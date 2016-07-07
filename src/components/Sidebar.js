import React, {Component} from 'react';
import {observer} from 'mobx-react';

@observer
class Sidebar extends Component {
    render() {
        const {selection} = this.props.store;
        return selection
            ? <div className="sidebar sidebar-open">
                <input onChange={this.onChange} value={selection.title} />
                X: {selection.x}, Y: {selection.y}
                <div>
                  <a onClick={(e) => this.onChangeColor("yellow")} className="color-button" style={{backgroundColor: "yellow"}}></a>
                  <a onClick={(e) => this.onChangeColor("blue")} className="color-button" style={{backgroundColor: "blue"}}></a>
                  <a onClick={(e) => this.onChangeColor("red")} className="color-button" style={{backgroundColor: "red"}}></a>
                  <a onClick={(e) => this.onChangeColor("green")} className="color-button" style={{backgroundColor: "green"}}></a>
                  <a onClick={(e) => this.onChangeColor("white")} className="color-button" style={{backgroundColor: "white"}}></a>
                  <a onClick={(e) => this.onChangeColor("orange")} className="color-button" style={{backgroundColor: "orange"}}></a>
                </div>
              </div>
            : <div className="sidebar" />;
    }

    onChange = (e) => {
        this.props.store.selection.title = e.target.value;
        console.log("Set title to: " + this.props.store.selection.title);
    }

    onChangeColor(color) {
      this.props.store.selection.color = color;
      console.log("Set color to: " + color);
    }
}

export default Sidebar;
