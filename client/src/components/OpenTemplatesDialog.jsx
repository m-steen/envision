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
export default class OpenTemplatesDialog extends React.Component {

  handleClose = () => {
    const {openTemplatesDialog} = this.props.store;
    openTemplatesDialog.open = false;
    openTemplatesDialog.models = null;
  };

  handleDefaultClick = () => {
    this.props.onLoadDefaultTemplate();
    this.handleClose();
  }

  handleClick = (model) => {
    this.props.onLoadTemplate(model);
    this.handleClose();
  }

  render() {
    const {openTemplatesDialog} = this.props.store;
    const actions = [
      <FlatButton
          label="Close"
          primary={true}
          onTouchTap={this.handleClose}
          />
    ];

    // loading: open, but no contents
    let loadingDiv = openTemplatesDialog.models === null?
      loadingDiv = <div>
        <p>Loading templates from the server. Please wait...</p>
        <CircularProgress/>
      </div> : undefined;

    const models = openTemplatesDialog.models || [];

    return (
      <Dialog
          title={"Create new model"}
          actions={actions}
          modal={true}
          open={openTemplatesDialog.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}>

          <div className="open-dialog-contents">
            <p>
              Please select the template that you want to use:
            </p>

            <List>
              <ListItem key="default"
                primaryText="Empty model"
                onTouchTap={e => this.handleDefaultClick()}>
              </ListItem>

              {models.map(model => {
                const date = model.date? new Date(model.date) : null;
                return <ListItem key={model.templateId}
                  primaryText={model.title? model.title : "<untitled model>"}
                  onTouchTap={e => this.handleClick(model)}>

                  </ListItem>;
                }
              )}
            </List>

            {loadingDiv}

          </div>
      </Dialog>
    );
  }
};
