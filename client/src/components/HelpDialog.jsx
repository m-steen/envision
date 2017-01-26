import React from 'react';
import { observer } from 'mobx-react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import help from './Help';

/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
@observer
export default class HelpDialog extends React.Component {

    handleOpen = () => {
        this.props.store.showHelp = true;
    };

    handleClose = () => {
        this.props.store.showHelp = false;
    };

    render() {
        const actions = [
            <FlatButton
                label="Close"
                primary={true}
                onTouchTap={this.handleClose}
                />
        ];

        const kind = this.props.store.model.kind;
        const title = help[kind]? help[kind].title : undefined || "No help";
        const content = help[kind]? help[kind].contents : undefined || "No help available...";

        return (
            <Dialog
                title={title}
                actions={actions}
                modal={false}
                open={this.props.store.showHelp}
                onRequestClose={this.handleClose}
                autoScrollBodyContent={true}>

                {content}
            </Dialog>
        );
    }
};
