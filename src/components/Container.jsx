import React, {Component} from 'react';
import {observer} from 'mobx-react';
import PostIt from './PostIt';

@observer
class Container extends Component {

  render() {
    const {container} = this.props;
    const postIts = container.postIts;

    return <div style={{
        position: 'absolute',
        left: container.x,
        top: container.y,
        height: container.height,
        width: container.width,
        border: '1px solid black',
        backgroundColor: 'inherit'
      }}
      onClick={(e) => this.props.onSelect(null)}>
      <a onClick={this.onAdd} style={{float: "right", fontSize: "2em", paddingRight: "10px"}}>+</a>
      <p>{container.title}</p>

      {postIts.map(postIt =>
        <PostIt key={postIt.pid} postIt={postIt} onSelect={this.props.onSelect} onDeletePostIt={this.props.onDeletePostIt}/>
      )}

    </div>;
  }

  onAdd = (e) => {
    this.props.onAddPostIt(this.props.container);
    console.log("Add a post it");
  }
}

export default Container;
