import React from 'react';
import ReactDOM from 'react-dom';
import {observer} from 'mobx-react';
import {observable, action} from 'mobx';
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

	@observable selected = false;
	@observable open = false;

	@action handleToggle = () => { 
		this.open = !this.open;
		this.selected = false;
	}

	@action handleClose = () => { 
		this.open = false;
		this.selected = false;
	}

	render() {
		const titleElem = this.selected ? 
			<input value={store.model.title} style={{margin: "0px", padding: "0px", fontSize: "24px", width: "initial", height: "64px" }}
				autoFocus
				onBlur={this.handleClose}
				onChange={(e) => store.model.title = e.target.value}/> : 
			<span onClick={(e) => { this.selected = true; }}>{store.model.title}</span>;

		return (
			<div>
				<AppBar 
					title={titleElem} 
					onLeftIconButtonTouchTap={this.handleToggle}
					// iconElementLeft={
					// 	<IconButton onTouchTap={this.handleToggle}><MenuIcon /></IconButton>
					// }
					className="menubar"
					/>
				<Drawer
					docked={false}
					open={this.open}
					
					onRequestChange={(open) => this.handleToggle()}
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
		store.showHelp = true;
	}
};
