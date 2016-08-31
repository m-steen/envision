import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';



class AppBarIconMenu extends Component {
//	constructor(props, context) {
//		super(props, context);
//	}

	render() {
		return (
			<div>
				<AppBar title="Business Model Canvas Modeler"

					iconElementLeft={
						<IconMenu
							iconButtonElement={
								<IconButton><MenuIcon color="white"/></IconButton>
							}
							targetOrigin={{ horizontal: 'right', vertical: 'top' }}
							anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
							>
							<MenuItem primaryText="Load" onClick={this.props.reload}/>
							<MenuItem primaryText="Save" onClick={this.props.save}/>
							<MenuItem primaryText="Close" onClick={this.props.close}/>
						</IconMenu>
					} />
			</div>
		)
	};
};

export default AppBarIconMenu;