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
export default class OpenTemplateDialog extends React.Component {

  handleClose = () => {
    this.props.store.loadingTemplate = false;
  };

  render() {
    const actions = [
      <FlatButton
          label="Close"
          primary={true}
          onTouchTap={this.handleClose}
          />
    ];

    return (
      <Dialog
          title={"Loading template"}
          actions={actions}
          modal={true}
          open={this.props.store.loadingTemplate}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}>

          <div>
              <p>Loading template. Please wait...</p>
              <CircularProgress/>
            </div>
        </Dialog>
    );
  }
};