import React, {Component} from 'react';
import {observer} from 'mobx-react';
import Container from './Container';
import PostIt from './PostIt';
import help from './Help';

function findHelp(kind, blockName) {
  const helpMap = help[kind]? help[kind].tooltips : undefined || {};
  return helpMap[blockName] || <p>Cannot find help for {blockName}.</p>;
}

@observer
class Canvas extends Component {

  render() {
    const {kind} = this.props.model;

    return <div id="canvas"
      style={{
          height: '700px',
          width: '1024px'
        }}>

      <div>
        {this.props.model.blocks.map((block) =>
           <Container key={block.id} block={block}
             showHelp={this.props.store.showBlockHelp === block}
             help={findHelp(kind, block.title)}
             onShowHelp={() => this.props.store.showBlockHelp = block}
             onHideHelp={() => this.props.store.showBlockHelp = null}
             onSelect={this.props.onSelect}
             onAddPostIt={this.props.onAddPostIt}/>
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
              isSelected={this.props.isSelected}
              onResizePostIt={this.props.onResizePostIt}/>
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
              isSelected={this.props.isSelected}
              onResizePostIt={this.props.onResizePostIt}/>
          )}
      </div>

    </div>;
  }
}

export default Canvas;
