import React, {Component} from 'react';
import {transaction} from 'mobx';
import {observer} from 'mobx-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBarIconMenu from './Menu'
import Canvas from './Canvas';
import Sidebar from './Sidebar';
import {findBlockForPostItXY, findBlockFor} from '../AppState';
import bmcPostIt from '../model/bmcPostIt';

import FacebookLogin from 'react-facebook-login';
import GoogleLogin from './GoogleLogin';
//import { GoogleLogin } from 'react-google-login-component';
//import Google from 'react-google-login';

function googleResponseHandler(googleUser) {
  console.log("----");
//  console.log(profile);
  debugger;
  console.log(googleUser);
//  console.log(googleUser.getBasicProfile());
  console.log(googleUser.isSignedIn());
  debugger;
  console.log("Break!");
  //var ar = googleUser.getAuthResponse();
  //console.log(ar);
  //  var id_token = googleUser.getAuthResponse().id_token;
  //  console.log({accessToken: id_token});
  //  console.log('ID: ' + googleUser.getId()); // Do not send to your backend! Use an ID token instead.
   //anything else you want to do(save to localStorage)...
}

@observer
class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
      <div onClick={(e) => this.props.store.selection = null}>
        {/*<AppBarIconMenu title={this.props.store.model.title} reload={this.props.reload} save={this.props.save} exportToJson={this.props.exportToJson}/>*/}
        {/*<FacebookLogin
    appId="1193159677397239"
    autoLoad={true}
    fields="name,email,picture"
    onClick={(e) => console.log("Clicked")}
    callback={(response) => {
      console.log(response);
    }} />*/}
      <GoogleLogin socialId="845584361979-q2l55qpmfi89otg7eakrkjl4pton64qa.apps.googleusercontent.com"
                         class="google-login"
                         scope="profile"
                         responseHandler={(googleUser) => googleResponseHandler(googleUser)}
                         buttonText="Login With Google"/>

        <Canvas store={this.props.store} model={this.props.store.model} onSelect={(object) => {
          this.props.store.selection = object;
        }}
        onAddPostIt={(block, x, y) => {
          const size = block.postIts.length;
          const px = x === undefined? 20+10*size : x - 60 - block.x;
          const py = y === undefined? 50+20*size : y - 40 - block.y;
          const postIt = new bmcPostIt('Click to edit', px, py);
          block.postIts.push(postIt);
          this.props.store.selection = postIt;
        }}
        onDeletePostIt={(postIt) => {
          for (let block of this.props.store.model.blocks) {
            for (let i = 0; i < block.postIts.length; i++) {
              if (block.postIts[i] === postIt) {
                block.postIts.splice(i, 1);
              }
            }
          }
          if (this.props.store.selection === postIt) {
            this.props.store.selection = null;
          }
        }}
        onMovePostIt={(postIt, block, x, y) => {
          // detect if we move to another block
          for (let b of this.props.store.model.blocks) {
            for (let i = 0; i < b.postIts.length; i++) {
              if (b.postIts[i] === postIt && b !== block) {
                b.postIts.splice(i, 1);
                block.postIts.push(postIt);
              }
            }
          }

          postIt.x = x;
          postIt.y = y;
        }}
        onDuplicatePostIt={(postIt) => {
          for (let b of this.props.store.model.blocks) {
            for (let i = 0; i < b.postIts.length; i++) {
              if (b.postIts[i] === postIt) {
                const {title, x, y, w, h, color} = postIt;
                const duplicate = new bmcPostIt(title, x + 20, y + 20, color);
                b.postIts.push(duplicate);
                this.props.store.selection = duplicate;
                return;
              }
            }
          }

        }}
        onMoveToFront={(postIt) => {
          for (let b of this.props.store.model.blocks) {
            for (let i = 0; i < b.postIts.length; i++) {
              if (b.postIts[i] === postIt) {
                b.postIts.splice(i, 1);
                b.postIts.push(postIt);
                return;
              }
            }
          }
        }}
        onMoveToBack={(postIt) => {
          for (let b of this.props.store.model.blocks) {
            for (let i = 0; i < b.postIts.length; i++) {
              if (b.postIts[i] === postIt) {
                b.postIts.splice(i, 1);
                b.postIts.unshift(postIt);
                return;
              }
            }
          }
        }}

        isSelected={(postIt) => this.props.store.selection === postIt}

        onStartDragPostIt={(postIt) => {
          const store = this.props.store;
          store.dragging = postIt;
          if (postIt !== store.selection) {
            store.selection = postIt;
          }
        }}
        onDragPostIt={(postIt, x, y) => {
        }}
        onDropPostIt={(postIt, bx, by, deltaX, deltaY) => {
          const store = this.props.store;
          store.dragging = null;

          // find the current block
          const currentBlock = findBlockFor(store.model, postIt);
          const targetBlock = findBlockForPostItXY(store.model, postIt);

          if (currentBlock !== targetBlock) {
            for (let i = 0; i < currentBlock.postIts.length; i++) {
              if (currentBlock.postIts[i] === postIt) {
                currentBlock.postIts.splice(i, 1);
                targetBlock.postIts.push(postIt);
              }
            }

            // ajust coordinates to relatives
            if (targetBlock === store.model) {
              postIt.x += currentBlock.x;
              postIt.y += currentBlock.y;
            } else {
              postIt.x -= targetBlock.x - currentBlock.x;// - targetBlock.x;
              postIt.y -= targetBlock.y - currentBlock.y;// - targetBlock.y;
            }
          }
        }}/>
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
