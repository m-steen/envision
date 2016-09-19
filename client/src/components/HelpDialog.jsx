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

        return (
            <Dialog
                title="About the Business Model Canvas"
                actions={actions}
                modal={false}
                open={this.props.store.showHelp}
                onRequestClose={this.handleClose}
                autoScrollBodyContent={true}
                >
                <p>The Business Model Canvas helps you to visualize your business model. 
                    With a business model you describe how your company creates, delivers, and captures value. 
                    It creates a shared understanding of what your business actually is and does. 
                    With the Business Model Canvas it is easy to discuss your business model with others.</p>

                <h2 style={{fontWeight: "normal", fontSize: "1.2em"}}>How to use?</h2>

                <p>The Business Model Canvas consists of nine components. 
                    Together these components show the logic of how your company intends to make money. 
                    Use sticky notes to add items to the business model components. 
                    Try to be brief and make sure that Sticky notes contain only one aspect of your business model. 
                    Use different colors to show which sticky notes belong together.</p>

                <p>When designing a new business model start with the customer segments and value proposition.</p>

                <p>When you are ready, you can save your Business Model Canvas for future reference. 
                    You can also open examples of existing Business Model Canvases for inspiration or as starting point for your own canvas.</p>

                <p>Good luck!</p>

            </Dialog>
        );
    }
};
