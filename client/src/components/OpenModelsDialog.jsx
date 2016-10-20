import React from 'react';
import { observer } from 'mobx-react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';
import CircularProgress from 'material-ui/CircularProgress';
import IconButton from 'material-ui/IconButton';

/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
@observer
export default class OpenModelsDialog extends React.Component {

  handleClose = () => {
    const {openModelsDialog} = this.props.store;
    openModelsDialog.open = false;
    openModelsDialog.models = null;
  };

  handleClick = (model) => {
    this.props.onLoadModel(model);
    this.handleClose();
  }

  handleDelete = (e, model) => {
    e.preventDefault();
    const {deleteModelDialog} = this.props.store;
    deleteModelDialog.deleting = false;
    deleteModelDialog.model = model;
  }

  render() {
    const {openModelsDialog} = this.props.store;
    const actions = [
      <FlatButton
          label="Close"
          primary={true}
          onTouchTap={this.handleClose}
          />
    ];

    // loading: open, but no contents
    let contents;
    if (openModelsDialog.models) {
      contents = openModelsDialog.models.length > 0?
        <div className="open-dialog-contents">
          <p>
            Please select the models that you want to open:
          </p>
          <List>
            {openModelsDialog.models.map(model => {
              const date = model.date? new Date(model.date) : null;
              return <ListItem key={model.id}
                primaryText={model.title? model.title : "<untitled model>"}
                secondaryText={date? date.toLocaleString() : ""}
                onTouchTap={e => this.handleClick(model)}
                rightIconButton={<IconButton
                  iconClassName="fa fa-trash-o"
                  onTouchTap={e => this.handleDelete(e, model)}
                  />}>

                </ListItem>;
              }
            )}
          </List>
        </div>
        : <p>You have no models available.</p>;
    }
    else {
      contents = <div>
        <p>Loading your models from the server. Please wait...</p>
        <CircularProgress/>
      </div>;
    }

    return (
      <Dialog
          title={"Open a model"}
          actions={actions}
          modal={true}
          open={openModelsDialog.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}>

        {contents}
      </Dialog>
    );
  }
};
