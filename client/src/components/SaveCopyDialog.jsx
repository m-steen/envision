import React from 'react';
import { observer } from 'mobx-react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
@observer
export default class SaveCopyDialog extends React.Component {

  handleSave = () => {
    this.props.store.showSaveCopyDialog.open = false;
    this.props.onSaveCopy(this.props.store.showSaveCopyDialog.title);
  };

  handleCancel = () => {
    this.props.store.showSaveCopyDialog.open = false;
  };

  render() {
    const showSaveCopyDialog = this.props.store.showSaveCopyDialog.open;
    const actions = [
      <FlatButton
          label="Save a copy"
          primary={true}
          onTouchTap={this.handleSave}
          />,
      <FlatButton
          label="Cancel"
          primary={false}
          onTouchTap={this.handleCancel}
          />
    ];

    return (
      <Dialog
          title={"Save a copy"}
          actions={actions}
          modal={true}
          open={showSaveCopyDialog}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}>

          <div>
            <p>
              This will create a new copy of your current model. The
              existing model won't be overwritten.
            </p>
            <TextField
              value={this.props.store.showSaveCopyDialog.title}
              onChange={(e) => this.props.store.showSaveCopyDialog.title = e.target.value}
              hintText="Hint Text"
              floatingLabelText="Floating Label Text"
              fullWidth={true}/>
          </div>
      </Dialog>
    );
  }
};
