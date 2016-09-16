import React from 'react';
import {observer} from 'mobx-react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import FileFolderOpen from 'material-ui/svg-icons/file/folder-open';
import ContentSave from 'material-ui/svg-icons/content/save';
import FileFileUpload from 'material-ui/svg-icons/file/file-upload'
import ActionPrint from 'material-ui/svg-icons/action/print'
import ActionHelp from 'material-ui/svg-icons/action/help'
import Download from 'material-ui/svg-icons/file/file-download'
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
					<MenuItem primaryText="Open" leftIcon={<FileFolderOpen />} onClick={() => {this.handleClose(); reload();}}/>
					<MenuItem primaryText="Save" leftIcon={<ContentSave />} onClick={() => {this.handleClose(); save();}}/>
					<MenuItem primaryText="SaveAs" leftIcon={<FileFileUpload />} onClick={() => {this.handleClose(); save();}}/>
					<MenuItem primaryText="Print" leftIcon={<ActionPrint />} onClick={this.print}/>
					<MenuItem primaryText="Help" leftIcon={<ActionHelp />} onClick={this.help}/>
					<MenuItem primaryText="Export" leftIcon={<Download />} onClick={exportToJson}/>
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
