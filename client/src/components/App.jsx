import React, {Component} from 'react';
import {observer} from 'mobx-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBarIconMenu from './Menu'
import Canvas from './Canvas';
import Sidebar from './Sidebar';
import guid from '../AppState';
import bmcPostIt from '../model/bmcPostIt';

import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

@observer
class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
      <div>
        <AppBarIconMenu reload={this.props.reload} save={this.props.save} />
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
        }}
        onMovePostIt={(postIt, block, x, y) => {
          // detect if we move to another block
          for (let b of this.props.store.model.blocks) {
            for (let i = 0; i < b.postIts.length; i++) {
              if (b.postIts[i] === postIt && b !== block) {
                b.postIts.splice(i, 1);
                block.postIts.push(postIt);
              }
            }
          }

          postIt.x = x;
          postIt.y = y;
        }}/>
        <Sidebar store={this.props.store}/>
      </div>
      </MuiThemeProvider>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
