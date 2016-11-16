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
import {loadModels, reload, save, exportToJson} from '../commands.js';
import {createNewModel} from '../AppState';
import FacebookLogin from 'react-facebook-login';

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
		const authInfo = store.authenticated? "" : "You are not authenticated";
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
					className="menubar">
					<p>{authInfo}</p>
				</AppBar>
				<Drawer
					docked={false}
					open={this.open}
					className="menu-drawer"

					onRequestChange={(open) => this.handleToggle()}
					>
					<AppBar
						title="Menu"
						onLeftIconButtonTouchTap={this.handleToggle}
						// iconElementLeft={
						// 	<IconButton onTouchTap={this.handleToggle}><MenuIcon /></IconButton>
						// }
						/>
					<MenuItem primaryText="New" leftIcon={<FileFolderOpen />} onClick={() => {this.handleClose(); store.model = createNewModel(store.model.kind);}}/>
					<MenuItem primaryText="Open" leftIcon={<FileFolderOpen />} onClick={() => {this.handleClose(); loadModels();}}/>
					<MenuItem primaryText="Save" leftIcon={<ContentSave />} onClick={() => {this.handleClose(); save();}}/>
					<MenuItem primaryText="SaveAs" leftIcon={<FileFileUpload />} onClick={() => {this.handleClose(); save();}}/>
					<MenuItem primaryText="Print" leftIcon={<ActionPrint />} onClick={this.print}/>
					<MenuItem primaryText="Help" leftIcon={<ActionHelp />} onClick={this.help}/>
					<MenuItem primaryText="Export" leftIcon={<Download />} onClick={exportToJson}/>
					{/*<MenuItem>
						<FacebookLogin appId="1193159677397239" cssClass="fb-login"
					    autoLoad={true} fields="name,email,picture"
					    callback={this.facebookResponse} />
					</MenuItem>*/}
				</Drawer>
			</div>

		)
	};

	facebookResponse = (response) => {
		this.handleClose();
		if (response.accessToken) {
			store.authenticated = {name: response.name, accessToken: response.accessToken};
		}
		else {
			store.authenticated = null;
		}
	}

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
