import React from 'react';
import {observer} from 'mobx-react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import store from '../AppState';
import {reload, save, exportToJson} from '../commands.js';

@observer
export default class AppMenu extends React.Component {

	constructor(props) {
		super(props);
		this.state = { open: false };
	}

	handleToggle = () => this.setState({open: !this.state.open});

	handleClose = () => this.setState({ open: false });

	render() {
		const title = store.model.title;
		return (
			<div>
				<AppBar 
					title={title}
					onLeftIconButtonTouchTap={this.handleToggle}
					// iconElementLeft={
					// 	<IconButton onTouchTap={this.handleToggle}><MenuIcon /></IconButton>
					// }
					className="menubar"
					/>
				<Drawer
					docked={false}
					open={this.state.open}
					className="menubar"
					onRequestChange={(open) => this.setState({ open }) }
					>
					<AppBar 
						title="Menu" 
						onLeftIconButtonTouchTap={this.handleToggle}
						// iconElementLeft={
						// 	<IconButton onTouchTap={this.handleToggle}><MenuIcon /></IconButton>
						// }
						/>
					<MenuItem primaryText="Open" onClick={reload}/>
					<MenuItem primaryText="Save" onClick={save}/>
					<MenuItem primaryText="SaveAs" onClick={save}/>
					<MenuItem primaryText="Print" onClick={this.print}/>
					<MenuItem primaryText="Help" onClick={this.help}/>
					<MenuItem primaryText="Export" onClick={exportToJson}/>
				</Drawer>
			</div>

		)
	};

	print = () => {
		this.handleClose();
		setTimeout(() => {
			window.print();
		}, 100);
		
	};

	help = () => {
		this.handleClose();
		setTimeout(() => {
			window.alert("Help not implemented yet.");
		}, 100);
	}
};
