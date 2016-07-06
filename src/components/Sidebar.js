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
              </div>
            : <div className="sidebar" />;
    }

    onChange = (e) => {
        this.props.store.selection.title = e.target.value;
        console.log(this.props.store.selection.title);
    }
}

export default Sidebar;
