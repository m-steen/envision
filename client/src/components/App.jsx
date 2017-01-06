import React, {Component} from 'react';
import {transaction} from 'mobx';
import {observer} from 'mobx-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {grey50, grey800} from 'material-ui/styles/colors';
import AppMenu from './Menu'
import Canvas from './Canvas';
// import Sidebar from './Sidebar';
import {findBlockForPostItXY, findBlockFor, createItem, replaceNewModel} from '../AppState';
import {loadModel, save, saveACopy, saveAndCreateNewModel} from '../commands';
import HelpDialog from './HelpDialog';
import ErrorDialog from './ErrorDialog';
import OpenModelsDialog from './OpenModelsDialog';
import OpenModelDialog from './OpenModelDialog';
import DeleteModelDialog from './DeleteModelDialog';
import SaveModelDialog from './SaveModelDialog';
import SaveCopyDialog from './SaveCopyDialog';
import ExportDialog from './ExportDialog';
import Snackbar from 'material-ui/Snackbar';

import help from './Help';

const envisionTheme = getMuiTheme({
  palette: {
    textColor: grey800,
    alternateTextColor: grey800
  },
  appBar: {
    color: grey50,
    opacity: 1
  }
});

@observer
class App extends Component {

  handleRequestClose = () => {
    this.props.store.snackbarMessage = null;
  }

  onSelect = (postIt) => this.props.store.selection = postIt;

  onAddPostIt = (block, x, y) => {
    const size = block.postIts.length;
    const px = x === undefined? 20+10*size : x - 60 - block.x;
    const py = y === undefined? 50+20*size : y - 40 - block.y;
    const postIt = createItem('Click to edit', px, py);
    block.postIts.push(postIt);
    this.props.store.selection = postIt;
  }

  onDeletePostIt = (postIt) => {
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
  }

  onMovePostIt = (postIt, block, x, y) => {
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
  }

  onDuplicatePostIt = (postIt) => {
    for (let b of this.props.store.model.blocks) {
      for (let i = 0; i < b.postIts.length; i++) {
        if (b.postIts[i] === postIt) {
          const {title, x, y, w, h, color} = postIt;
          const duplicate = createItem(title, x + 20, y + 20, w, h, color);
          b.postIts.push(duplicate);
          this.props.store.selection = duplicate;
          return;
        }
      }
    }
  }

  onMoveToFront = (postIt) => {
    for (let b of this.props.store.model.blocks) {
      for (let i = 0; i < b.postIts.length; i++) {
        if (b.postIts[i] === postIt) {
          b.postIts.splice(i, 1);
          b.postIts.push(postIt);
          return;
        }
      }
    }
  }

  onMoveToBack = (postIt) => {
    for (let b of this.props.store.model.blocks) {
      for (let i = 0; i < b.postIts.length; i++) {
        if (b.postIts[i] === postIt) {
          b.postIts.splice(i, 1);
          b.postIts.unshift(postIt);
          return;
        }
      }
    }
  }

  isSelected = (postIt) => this.props.store.selection === postIt;

  onStartDragPostIt = (postIt) => {
    const store = this.props.store;
    store.dragging = postIt;
    if (postIt !== store.selection) {
      store.selection = postIt;
    }
  }

  onDragPostIt = (postIt, x, y) => {
  }

  onDropPostIt = (postIt, bx, by, deltaX, deltaY) => {
    const store = this.props.store;
    store.dragging = null;

    // find the current block
    const currentBlock = findBlockFor(store.model, postIt);
    const targetBlock = findBlockForPostItXY(store.model, postIt);

    if (currentBlock !== targetBlock) {
      for (let i = 0; i < currentBlock.postIts.length; i++) {
        if (currentBlock.postIts[i] === postIt) {
          currentBlock.postIts.splice(i, 1);
          targetBlock.postIts.push(postIt);
        }
      }

      // ajust coordinates to relatives
      if (targetBlock === store.model) {
        postIt.x += currentBlock.x;
        postIt.y += currentBlock.y;
      } else {
        postIt.x -= targetBlock.x - currentBlock.x;// - targetBlock.x;
        postIt.y -= targetBlock.y - currentBlock.y;// - targetBlock.y;
      }
    }
  }

  onCreateNewModel = (doSave) => {
    saveAndCreateNewModel(doSave);
  }

  onSaveCopy = (title) => {
    saveACopy(title);
  }

  render() {
    const footer = this.props.store.model.kind === "bmc"?
      <div id="footer" style={{width: "1012px"}}>
        <p>
          The Business Model Canvas from Strategyzer.com is licensed under the <br/>
          Creative Commons Attribution-Share Alike 3.0 Unported License.
        </p>
      </div> :
      undefined;

    return (
      <MuiThemeProvider muiTheme={envisionTheme}>
        <div onClick={(e) => this.onSelect(null)}>
          <AppMenu />

          <div className="print-header">
            <h1>{this.props.store.model.title}</h1>
            <img src="resources/businessmakeover_background.png"/>
          </div>

          <Canvas store={this.props.store}
            model={this.props.store.model}
            onSelect={this.onSelect}
            onAddPostIt={this.onAddPostIt}
            onDeletePostIt={this.onDeletePostIt}
            onMovePostIt={this.onMovePostIt}
            onDuplicatePostIt={this.onDuplicatePostIt}
            onMoveToFront={this.onMoveToFront}
            onMoveToBack={this.onMoveToBack}
            isSelected={this.isSelected}
            onStartDragPostIt={this.onStartDragPostIt}
            onDragPostIt={this.onDragPostIt}
            onDropPostIt={this.onDropPostIt}/>

          {footer}

          <Snackbar open={this.props.store.snackbarMessage != null}
            message={this.props.store.snackbarMessage? this.props.store.snackbarMessage : "<none>"}
            autoHideDuration={4000}
            onRequestClose={this.handleRequestClose}
            className="message-snackbar"/>

          <HelpDialog key="F1" store={this.props.store} />
          <OpenModelsDialog store={this.props.store}
            onLoadModel={model => loadModel(model.id)}/>
          <OpenModelDialog store={this.props.store} />
          <DeleteModelDialog store={this.props.store} />
          <SaveModelDialog store={this.props.store} onNewModel={this.onCreateNewModel}/>
          <SaveCopyDialog store={this.props.store} onSaveCopy={this.onSaveCopy}/>
          <ExportDialog store={this.props.store}/>

          {/* The error dialog is explicitly rendered as last, so it is always on top.*/}
          <ErrorDialog store={this.props.store}/>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
