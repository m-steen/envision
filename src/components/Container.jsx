import React, {Component} from 'react';
import {observer} from 'mobx-react';
import PostIt from './PostIt';

@observer
class Container extends Component {

  render() {
    const block = this.props.block;
    const postIts = block.postIts;

    return <div style={{
        position: 'absolute',
        left: block.x,
        top: block.y,
        width: block.w,
        height: block.h,
        border: '3px solid grey',
        backgroundColor: 'inherit'
      }}
      onClick={(e) => this.props.onSelect(null)}>
      <p style={{float: "left", fontFamily: "Verdana", paddingLeft: "10px"}}>{block.title}</p>
      <a onClick={this.onAdd} style={{float: "right", fontSize: "2em", paddingRight: "10px"}}>+</a>

      {postIts.map(postIt =>
        <PostIt key={postIt.id} postIt={postIt} onSelect={this.props.onSelect} onDeletePostIt={this.props.onDeletePostIt}/>
      )}

    </div>;
  }

  onAdd = (e) => {
    this.props.onAddPostIt(this.props.block);
    console.log("Add a post it");
  }
}

export default Container;
