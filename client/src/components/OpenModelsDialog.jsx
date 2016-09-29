import React from 'react';
import { observer } from 'mobx-react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';

/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
@observer
export default class OpenModelsDialog extends React.Component {

  handleClose = () => {
    this.props.store.openModelsDialog = null;
  };

  handleClick = (model) => {
    this.props.onLoadModel(model);
    this.props.store.openModelsDialog = null;
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

    const contents = openModelsDialog && openModelsDialog.length > 0?
      <div>
        <p>
          Please select the models that you want to open:
        </p>
        <List>
          {openModelsDialog.map(model =>
            <ListItem key={model.id} primaryText={model.title? model.title : "<untitled model>"}
              onClick={e => this.handleClick(model)}></ListItem>
          )}
        </List>
      </div>
      : <p>You have no models available.</p>;

    return (
      <Dialog
          title={"Open a model"}
          actions={actions}
          modal={true}
          open={openModelsDialog != null}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}>

        {contents}
      </Dialog>
    );
  }
};
