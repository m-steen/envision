import React, {Component} from 'react';
import {transaction} from 'mobx';
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
      <div onClick={(e) => this.props.store.selection = null}>
        <AppBarIconMenu reload={this.props.reload} save={this.props.save} />
        <Canvas model={this.props.store.model} onSelect={(object) => {
          this.props.store.selection = object;
        }}
        onAddPostIt={(block, x, y) => {
          const size = block.postIts.length;
          const px = x === undefined? 20+10*size : x - 60 - block.x;
          const py = y === undefined? 50+20*size : y - 40 - block.y;
          const postIt = new bmcPostIt('New PostIt ' + size, px, py, 120, 80);
          block.postIts.push(postIt);
          this.props.store.selection = postIt;
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
        }}
        onDuplicatePostIt={(postIt) => {
          for (let b of this.props.store.model.blocks) {
            for (let i = 0; i < b.postIts.length; i++) {
              if (b.postIts[i] === postIt) {
                const {title, x, y, w, h, color} = postIt;
                const duplicate = new bmcPostIt(title, x + 20, y + 20, w, h, color);
                b.postIts.push(duplicate);
                this.props.store.selection = duplicate;
                return;
              }
            }
          }

        }}
        onMoveToFront={(postIt) => {
          for (let b of this.props.store.model.blocks) {
            for (let i = 0; i < b.postIts.length; i++) {
              if (b.postIts[i] === postIt) {
                b.postIts.splice(i, 1);
                b.postIts.push(postIt);
                return;
              }
            }
          }
        }}
        onMoveToBack={(postIt) => {
          for (let b of this.props.store.model.blocks) {
            for (let i = 0; i < b.postIts.length; i++) {
              if (b.postIts[i] === postIt) {
                b.postIts.splice(i, 1);
                b.postIts.unshift(postIt);
                return;
              }
            }
          }
        }}

        isSelected={(postIt) => this.props.store.selection === postIt}

        onStartDragPostIt={(postIt) => {
          if (postIt !== this.props.store.selection) {
            this.props.store.selection = postIt;
          }
        }}
        onDragPostIt={(postIt, x, y) => {
        }}
        onDropPostIt={(postIt, bx, by, deltaX, deltaY) => {
          // find the current block
          const blocks = this.props.store.model.blocks;
          let currentBlock = null;
          for (let i = 0; i < blocks.length; i++) {
            const block = blocks[i];
            for (let j = 0; j < block.postIts.length; j++) {
              const p = block.postIts[j];
              if (p === postIt) {
                currentBlock = block;
                break;
              }
            }
          }

          // check if it moved to another block
          // first find the block that houses the coordinates
          let targetBlock = null;
          for (let i = 0; i < blocks.length; i++) {
            const block = blocks[i];
            const {x, y, w, h} = block;
            if (x <= bx &&
              bx <= x + w &&
              y <= by &&
              by <= y + h) {
                targetBlock = block;
                break;
              }
          }

          if (targetBlock == null) {
            console.log("Block not found");
          }
          else {
            postIt.x += deltaX;
            postIt.y += deltaY;
            if (currentBlock !== targetBlock) {
              for (let i = 0; i < currentBlock.postIts.length; i++) {
                if (currentBlock.postIts[i] === postIt) {
                  currentBlock.postIts.splice(i, 1);
                  targetBlock.postIts.push(postIt);
                }
              }

              // ajust coordinates to relatives
              postIt.x -= targetBlock.x - currentBlock.x;// - targetBlock.x;
              postIt.y -= targetBlock.y - currentBlock.y;// - targetBlock.y;
            }
          }
        }}/>

        {/*
        <Sidebar store={this.props.store}/>
        */}
      </div>
      </MuiThemeProvider>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
