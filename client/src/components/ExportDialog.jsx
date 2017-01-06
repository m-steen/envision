import React from 'react';
import { observer } from 'mobx-react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
@observer
export default class ExportDialog extends React.Component {

  handleClose = () => {
    this.props.store.showExportModelDialog = false;
  };

  render() {
    const {showExportModelDialog} = this.props.store;
    const actions = [
      <FlatButton
          label="Close"
          primary={true}
          onTouchTap={this.handleClose}
          />
    ];

    return (
      <Dialog
          title={"Export to JSON"}
          actions={actions}
          modal={true}
          open={showExportModelDialog}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}>

        <pre>
          {JSON.stringify(this.props.store.model, null, 2)}
        </pre>
      </Dialog>
    );
  }
};
