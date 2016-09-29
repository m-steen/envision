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
export default class ErrorDialog extends React.Component {

  handleClose = () => {
    this.props.store.error = null;
  };

  render() {
    const {error} = this.props.store;
    const actions = [
      <FlatButton
          label="Close"
          primary={true}
          onTouchTap={this.handleClose}
          />
    ];

    return (
      <Dialog
          title={error && error.title ? error.title : "Something went wrong..."}
          actions={actions}
          modal={true}
          open={error != null}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}>

        <p>{error? error.message : null}</p>
        <p>{error? error.details : null}</p>
      </Dialog>
    );
  }
};
