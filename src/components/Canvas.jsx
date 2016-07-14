import React, {Component} from 'react';
import {observer} from 'mobx-react';
import Container from './Container';

@observer
class Canvas extends Component {

  render() {
    return <div style={{
      height: '100%',
      width: '100%'
    }}>
      {this.props.model.blocks.map((block) =>
         <Container key={block.id} block={block}
           onSelect={this.props.onSelect}
           onAddPostIt={this.props.onAddPostIt}
           onDeletePostIt={this.props.onDeletePostIt}
           onMovePostIt={this.props.onMovePostIt}/>
      )}

    </div>;
  }
}

export default Canvas;
