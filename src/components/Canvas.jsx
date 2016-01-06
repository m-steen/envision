import React from 'react';
import {connect} from 'react-redux';
import {DropTarget} from 'react-dnd';
import PostIt from './PostIt';
import * as actionCreators from '../action_creators';
import {ItemTypes} from './Constants';

const canvasTarget = {
  drop(props, monitor) {
    const pid = monitor.getItem().postItId;
    const initialSourceOffset = monitor.getInitialSourceClientOffset();
    const initialOffset = monitor.getInitialClientOffset();
    const offset = monitor.getClientOffset();
    const x = offset.x - (initialOffset.x - initialSourceOffset.x);
    const y = offset.y - (initialOffset.y - initialSourceOffset.y);
    props.moveCard(pid, x, y);
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
      {this.props.postIts.toList().map(postIt => {
        return <PostIt key={postIt.get('pid')}
                  pid={postIt.get('pid')}
                  x={postIt.get('x')}
                  y={postIt.get('y')}
                  width={postIt.get('width')}
                  height={postIt.get('height')}
                  color={postIt.get('color')}
                  title={postIt.get('title')} />;
      })}
    </div>);

/*    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100%" height="100%"
        onDoubleClick={(e) => this.props.addCard(e.clientX, e.clientY, 130, 100, 'yellow', 'Note at ' + e.clientX + ',' + e.clientY)}>
      <defs>
        <pattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M 10 0 L 0 0 0 10" fill="none" stroke="gray" strokeWidth="0.5"/>
        </pattern>
        <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
          <rect width="100" height="100" fill="url(#smallGrid)"/>
          <path d="M 100 0 L 0 0 0 100" fill="none" stroke="gray" strokeWidth="1"/>
        </pattern>
      </defs>

      <rect width="100%" height="100%" fill="url(#grid)" />

      <rect x="50" y="50" width="200" height="500" className="canvas-box"/>

      <rect x="250" y="50" width="200" height="250" className="canvas-box"/>

      <rect x="250" y="300" width="200" height="250" className="canvas-box"/>

      <rect x="450" y="50" width="200" height="500" className="canvas-box"/>

      <rect x="650" y="50" width="200" height="250" className="canvas-box"/>

      <rect x="650" y="300" width="200" height="250" className="canvas-box"/>

      <rect x="850" y="50" width="200" height="500" className="canvas-box"/>

      <rect x="50" y="550" width="500" height="250" className="canvas-box"/>

      <rect x="550" y="550" width="500" height="250" className="canvas-box"/>

      {this.props.postIts.map(postIt => {
        return <PostIt key={postIt.get('pid')}
                  x={postIt.get('x')}
                  y={postIt.get('y')}
                  width={postIt.get('width')}
                  height={postIt.get('height')}
                  color={postIt.get('color')}
                  title={postIt.get('title')} />;
      })}
    </svg>;*/
  }
});

function mapStateToProps(state) {
  return {
    title: state.get('title'),
    postIts: state.get('postIts')
  };
}

const DropCanvas = DropTarget(ItemTypes.POSTIT, canvasTarget, collect)(Canvas);

const ConnectedCanvas = connect(mapStateToProps, actionCreators)(DropCanvas);

export default ConnectedCanvas;
