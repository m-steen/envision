import React from 'react';
import { observer } from 'mobx-react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';
import CircularProgress from 'material-ui/CircularProgress';
import { deleteModel, loadModels } from '../commands';

/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
@observer
export default class DeleteModelDialog extends React.Component {

  handleClose = () => {
    this.props.store.deleteModelDialog.deleting = false;
    this.props.store.deleteModelDialog.model = null;
  };

  handleDelete = () => {
    deleteModel();
    loadModels(); // re-initialize state for this component
  };

  render() {
    const {deleteModelDialog} = this.props.store;
    const actions = [];
    if (!deleteModelDialog.deleting) {
      actions.push(<FlatButton
          label="Delete"
          primary={false}
          onTouchTap={this.handleDelete}
          />);
      actions.push(<FlatButton
          label="Cancel"
          primary={true}
          onTouchTap={this.handleClose}
          />);
    }

    const content = deleteModelDialog.deleting?
      <CircularProgress/> :
      <div>
        <p>Are you sure that you want to delete '{deleteModelDialog.model? deleteModelDialog.model.title : ""}'? This cannot be undone.</p>
      </div>;

    return <Dialog
          title={"Delete model"}
          actions={actions}
          modal={true}
          open={deleteModelDialog.model != null}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}>

        {content}

        </Dialog>;
  }
};
