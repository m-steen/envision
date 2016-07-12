import React, {Component} from 'react';
import {observer} from 'mobx-react';
import Canvas from './Canvas';
import Sidebar from './Sidebar';
import guid from '../AppState';
import bmcPostIt from '../model/bmcPostIt';

@observer
class App extends Component {
  render() {
    return <div>
        <a href="#" onClick={this.props.reload}>Load!</a> -
        <a href="#" onClick={this.props.save}>Save!</a>
        <Canvas model={this.props.store.model} onSelect={(object) => {
          this.props.store.selection = object;
        }}
        onAddPostIt={(block) => {
          const size = block.postIts.length;
          block.postIts.push( new bmcPostIt( 'New PostIt '+size, 20+10*size, 50+20*size, 120, 80 ) )
        }}
        onDeletePostIt={(postIt) => {
          for (let block of this.props.store.model.blocks) {
            for (let i = 0; i < block.postIts.length; i++) {
              if (block.postIts[i] === postIt) {
                block.postIts.splice(i, 1);
              }
            }
          }
          if (this.props.store.selection === postIt) {
            this.props.store.selection = null;
          }
        }}/>
        <Sidebar store={this.props.store}/>
      </div>;
  }
}

export default App;
