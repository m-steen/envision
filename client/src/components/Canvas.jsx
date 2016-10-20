import React, {Component} from 'react';
import {observer} from 'mobx-react';
import Container from './Container';
import PostIt from './PostIt';

@observer
class Canvas extends Component {

  render() {
    return <div id="canvas" style={{
          height: '700px'
        }}>

      <div>
        {this.props.model.blocks.map((block) =>
           <Container key={block.id} block={block}
             onSelect={this.props.onSelect}
             onAddPostIt={this.props.onAddPostIt}
             onDeletePostIt={this.props.onDeletePostIt}
             onMovePostIt={this.props.onMovePostIt}
             onStartDragPostIt={this.props.onStartDragPostIt}
             onDragPostIt={this.props.onDragPostIt}
             onDropPostIt={this.props.onDropPostIt}/>
        )}
      </div>

      <div>
        {this.props.model.blocks.map(block =>
          block.postIts.map(postIt =>
            <PostIt key={postIt.id} postIt={postIt}
              x={block.x + postIt.x}
              y={block.y + postIt.y}
              onSelect={this.props.onSelect}
              onDeletePostIt={this.props.onDeletePostIt}
              onStartDragPostIt={this.props.onStartDragPostIt}
              onDragPostIt={this.props.onDragPostIt}
              onDropPostIt={this.props.onDropPostIt}
              onMoveToFront={this.props.onMoveToFront}
              onMoveToBack={this.props.onMoveToBack}
              onDuplicatePostIt={this.props.onDuplicatePostIt}
              isSelected={this.props.isSelected}/>
          ))}
      </div>

      <div>
        {this.props.model.postIts.map(postIt =>
            <PostIt key={postIt.id} postIt={postIt}
              x={postIt.x}
              y={postIt.y}
              onSelect={this.props.onSelect}
              onDeletePostIt={this.props.onDeletePostIt}
              onStartDragPostIt={this.props.onStartDragPostIt}
              onDragPostIt={this.props.onDragPostIt}
              onDropPostIt={this.props.onDropPostIt}
              onMoveToFront={this.props.onMoveToFront}
              onMoveToBack={this.props.onMoveToBack}
              onDuplicatePostIt={this.props.onDuplicatePostIt}
              isSelected={this.props.isSelected}/>
          )}
      </div>

    </div>;
  }
}

export default Canvas;
