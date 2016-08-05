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
                  <a onClick={(e) => this.onChangeColor("orange")} className="color-button orange"></a>
                  <a onClick={(e) => this.onChangeColor("blue")} className="color-button blue"></a>
                  <a onClick={(e) => this.onChangeColor("red")} className="color-button red"></a>
                  <a onClick={(e) => this.onChangeColor("green")} className="color-button green"></a>
                  <a onClick={(e) => this.onChangeColor("white")} className="color-button white"></a>
                  <a onClick={(e) => this.onChangeColor("purple")} className="color-button purple"></a>
                </div>
              </div>
            : <div className="sidebar" />;
    }

    onChange = (e) => {
        this.props.store.selection.title = e.target.value;
    }

    onChangeColor(color) {
      this.props.store.selection.color = color;
    }
}

export default Sidebar;
