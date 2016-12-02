import React from 'react';
import { observer } from 'mobx-react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';
import CircularProgress from 'material-ui/CircularProgress';

/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
@observer
export default class SaveModelDialog extends React.Component {

  handleYes = () => {
    this.props.store.showSaveModelDialog = false;
    this.props.onNewModel(true);
  };

  handleNo = () => {
    this.props.store.showSaveModelDialog = false;
    this.props.onNewModel(false);
  };

  handleCancel = () => {
    this.props.store.showSaveModelDialog = false;
  };

  render() {
    const {showSaveModelDialog} = this.props.store;
    const actions = [
      <FlatButton
          label="Yes"
          primary={true}
          onTouchTap={this.handleYes}
          />,
      <FlatButton
          label="No"
          primary={false}
          onTouchTap={this.handleNo}
          />,
      <FlatButton
          label="Cancel"
          primary={false}
          onTouchTap={this.handleCancel}
          />
    ];

    return (
      <Dialog
          title={"Unsaved changes"}
          actions={actions}
          modal={true}
          open={showSaveModelDialog}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}>

          <div>
            <p>You have unsaved changes in your model. Do you want to save these?</p>
          </div>
      </Dialog>
    );
  }
};
