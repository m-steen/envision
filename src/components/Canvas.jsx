import React from 'react';
import {connect} from 'react-redux';
import {DropTarget} from 'react-dnd';
import Container from './Container';
import PostIt from './PostIt';
import * as actionCreators from '../action_creators';
import {ItemTypes} from './Constants';

const canvasTarget = {
  drop(props, monitor) {
/*    const pid = monitor.getItem().postItId;
    const initialSourceOffset = monitor.getInitialSourceClientOffset();
    const initialOffset = monitor.getInitialClientOffset();
    const offset = monitor.getClientOffset();
    const x = offset.x - (initialOffset.x - initialSourceOffset.x);
    const y = offset.y - (initialOffset.y - initialSourceOffset.y);
    props.moveCard(pid, x, y);*/
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

const Canvas = React.createClass({
  render: function() {
    const {connectDropTarget} = this.props;
    return connectDropTarget(<div style={{
      height: '100%',
      width: '100%',
      backgroundColor: 'lightGrey'
    }}
    onDoubleClick={(e) => this.props.addCard(e.clientX, e.clientY, 130, 100, 'yellow', 'Note at ' + e.clientX + ',' + e.clientY)}>
      {this.props.containers.toList().map(container => {
        const containerId = container.get('id');
        const postIts = this.props.postIts.filter(postIt => {
          return postIt.get('container') === containerId;
        });

        return <Container key={container.get('id')}
          id={container.get('id')}
          x={container.get('x')}
          y={container.get('y')}
          width={container.get('width')}
          height={container.get('height')}
          title={container.get('title')}
          postIts={postIts.toList()}
          moveCard={this.props.moveCard} />;
      })}

    </div>);
  }
});

function mapStateToProps(state) {
  return {
    title: state.get('title'),
    containers: state.get('containers'),
    postIts: state.get('postIts')
  };
}

const DropCanvas = DropTarget(ItemTypes.POSTIT, canvasTarget, collect)(Canvas);

const ConnectedCanvas = connect(mapStateToProps, actionCreators)(DropCanvas);

export default ConnectedCanvas;
