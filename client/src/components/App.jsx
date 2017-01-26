import React, {Component} from 'react';
import {transaction} from 'mobx';
import {observer} from 'mobx-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {grey50, grey800} from 'material-ui/styles/colors';
import AppMenu from './Menu'
import Canvas from './Canvas';
// import Sidebar from './Sidebar';
import {findBlockForPostItXY, findBlockFor, createItem, replaceNewModel, addItem, removeItem, moveItem, duplicateItem, moveToFront, moveToBack} from '../AppState';
import {loadModel, save, saveACopy, saveAndCreateNewModel, loadTemplate} from '../commands';
import HelpDialog from './HelpDialog';
import ErrorDialog from './ErrorDialog';
import OpenModelsDialog from './OpenModelsDialog';
import OpenModelDialog from './OpenModelDialog';
import OpenTemplatesDialog from './OpenTemplatesDialog';
import OpenTemplateDialog from './OpenTemplateDialog';
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
    const postIt = addItem(block, x, y);
    this.props.store.selection = postIt;
  }

  onDeletePostIt = (postIt) => {
    removeItem(this.props.store.model, postIt);
    if (this.props.store.selection === postIt) {
      this.props.store.selection = null;
    }
  }

  onMovePostIt = (postIt, block, x, y) => {
    console.log("Moving to block " + block.title);
    moveItem(this.props.store.model, postIt, block, x, y);
  }

  onDuplicatePostIt = (postIt) => {
    const duplicate = duplicateItem(this.props.store.model, postIt);
    this.props.store.selection = duplicate;
  }

  onMoveToFront = (postIt) => {
    moveToFront(this.props.store.model, postIt);
  }

  onMoveToBack = (postIt) => {
    moveToBack(this.props.store.model, postIt);
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
          <OpenModelsDialog store={this.props.store} onLoadModel={model => loadModel(model.id)}/>
          <OpenModelDialog store={this.props.store}/>
          <OpenTemplatesDialog store={this.props.store}
            onLoadDefaultTemplate={() => replaceNewModel(this.props.store.model.kind)}
            onLoadTemplate={template => loadTemplate(template.templateId)}/>
          <OpenTemplateDialog store={this.props.store}/>
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
