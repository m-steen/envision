import React, {Component} from 'react';
import {transaction} from 'mobx';
import {observer} from 'mobx-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {grey50, grey800} from 'material-ui/styles/colors';
import AppMenu from './Menu'
import Canvas from './Canvas';
// import Sidebar from './Sidebar';
import {createItem, replaceNewModel, addItem, removeItem, duplicateItem, moveToFront, moveToBack, moveItem, dropItem, selectItem, isItemSelected, startDragItem, resizeItem} from '../AppState';
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
        <div onClick={(e) => selectItem(this.props.store, null)}>
          <AppMenu />

          <div className="print-header">
            <h1>{this.props.store.model.title}</h1>
            <img src="resources/businessmakeover_background.png"/>
          </div>

          <Canvas store={this.props.store}
            model={this.props.store.model}
            onSelect={(postIt) => selectItem(this.props.store, postIt)}
            onAddPostIt={(block, x, y) => addItem(this.props.store, block, x, y)}
            onDeletePostIt={(postIt) => removeItem(this.props.store, postIt)}
            onDuplicatePostIt={(postIt) => duplicateItem(this.props.store, postIt)}
            onMoveToFront={(postIt) => moveToFront(this.props.store.model, postIt)}
            onMoveToBack={(postIt) => moveToBack(this.props.store.model, postIt)}
            isSelected={(postIt) => isItemSelected(this.props.store, postIt)}
            onStartDragPostIt={(postIt) => startDragItem(this.props.store, postIt)}
            onDragPostIt={(postIt, deltaX, deltaY) => moveItem(postIt, deltaX, deltaY)}
            onDropPostIt={(postIt, bx, by, deltaX, deltaY) => dropItem(this.props.store, postIt, bx, by, deltaX, deltaY)}
            onResizePostIt={(postIt, width, height) => resizeItem(postIt, width, height)}/>

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
          <SaveModelDialog store={this.props.store} onNewModel={(doSave) => saveAndCreateNewModel(doSave)}/>
          <SaveCopyDialog store={this.props.store} onSaveCopy={(title) => saveACopy(title)}/>
          <ExportDialog store={this.props.store}/>

          {/* The error dialog is explicitly rendered as last, so it is always on top.*/}
          <ErrorDialog store={this.props.store}/>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
