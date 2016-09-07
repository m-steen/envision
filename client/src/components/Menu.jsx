import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import FlatButton from 'material-ui/FlatButton/FlatButton';



class AppBarIconMenu extends Component {

	render() {
		return (
			<div>
				<AppBar title={this.props.title} 

					iconElementLeft={
						<IconMenu
							iconButtonElement={
								<IconButton><MenuIcon color="white"/></IconButton>
							}
							targetOrigin={{ horizontal: 'right', vertical: 'top' }}
							anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
							>
							<MenuItem primaryText="Open" onClick={this.props.reload}/>
							<MenuItem primaryText="Save" onClick={this.props.save}/>
							<MenuItem primaryText="SaveAs" onClick={this.props.save}/>
							<MenuItem primaryText="Help" onClick={this.help}/>
							<MenuItem primaryText="Export" onClick={this.exportToJson}/>
						</IconMenu>
					}

					iconElementRight={
						<div>
							<FlatButton label="Open" onClick={this.props.reload}/>
							<FlatButton label="Save" onClick={this.props.save}/>
							<FlatButton label="Print" onClick={this.print}/>
							<FlatButton label="Help" onClick={this.help}/>
						</div>
					}
					/>
			</div>
		)
	};

	print() {
		window.print();
	};

	help() {
		window.alert("Help not implemented yet.");
	}
	exportToJson() {
		window.alert("Export to Json not implemented yet.");
	};
};

export default AppBarIconMenu;