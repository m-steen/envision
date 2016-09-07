import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {observable, transaction, computed} from 'mobx';
import {observer} from 'mobx-react';
import {Resizable} from 'react-resizable';
import {DraggableCore} from 'react-draggable';
import {DragSource} from 'react-dnd';
import {ItemTypes} from './Constants';

const postItSource = {
  beginDrag(props) {
    return props;
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

function onResize(postIt, size) {
  postIt.w = size.width;
  postIt.h = size.height;
}

function handleDrag(postIt, dragInfo) {
  //       transaction(() => {

  postIt.x += dragInfo.deltaX;
  postIt.y += dragInfo.deltaY;
}

function handleDrop(fn, postIt, dragInfo) {
  setTimeout(() => fn(postIt, dragInfo.x, dragInfo.y, dragInfo.deltaX, dragInfo.deltaY), 1);
}

@observer
class PostIt extends Component {
  componentDidMount() {
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    const selected = this.props.isSelected(this.props.postIt);
    if (selected) {
      ReactDOM.findDOMNode(this.refs.postItInput).focus();
    }
  }

  render() {
    const {x, y} = this.props;
    const {title, color, w, h} = this.props.postIt;

    let textX = x + 20;
    let textY = y + 20;
    let textW = w - 40;
    let textH = h - 40;

    // the post it represented in SVG
    const {connectDragSource} = this.props;
    const selected = this.props.isSelected(this.props.postIt);
    const dragHandleHeight = 20;

    const toolBarElem = selected?
      <div className="toolbar" style={{
          position: 'absolute',
          left: x,
          top: y - 40
        }}>
        <div>
          <a className="color-button handle" onClick={(e) => e.stopPropagation()}>D</a>
          <a className="color-button" onClick={(e) => this.onDelete(e)}>X</a>
          <a className="color-button" onClick={(e) => this.onMoveToFront(e)}>F</a>
          <a className="color-button" onClick={(e) => this.onMoveToBack(e)}>B</a>
          <a className="color-button" onClick={(e) => this.onDuplicatePostIt(e)}>C</a>
          <a onClick={(e) => this.onChangeColor(e, "orange")} className="color-button orange"></a>
          <a onClick={(e) => this.onChangeColor(e, "blue")} className="color-button blue"></a>
          <a onClick={(e) => this.onChangeColor(e, "red")} className="color-button red"></a>
          {/*<a onClick={(e) => this.onChangeColor(e, "green")} className="color-button green"></a>
          <a onClick={(e) => this.onChangeColor(e, "white")} className="color-button white"></a>
        <a onClick={(e) => this.onChangeColor(e, "purple")} className="color-button purple"></a>*/}
        </div>
      </div> :
      undefined;

    const titleElem = selected?
      <textarea
          onChange={(e) => this.props.postIt.title = e.target.value}
          style={{width: (w - 8) + "px", height: (h - dragHandleHeight - 8) + "px"}}
          ref="postItInput"
          value={title}>
      </textarea> :
      <p>{title}</p>;

    return <div>
      <DraggableCore handle=".handle"
          onStart={(e, dragInfo) => this.props.onStartDragPostIt(this.props.postIt)}
          onDrag={(e, dragInfo) => handleDrag(this.props.postIt, dragInfo)}
          onStop={(e, dragInfo) => handleDrop(this.props.onDropPostIt, this.props.postIt, dragInfo)}>

        <div>
          {toolBarElem}

          <Resizable height={h} width={w} minConstraints={[100, 50]} onResize={(event, {size}) => onResize(this.props.postIt, size)}>
            <div className={"postit " + color + (selected? " selected" : "")} style={{
                  position: 'absolute',
                  left: x,
                  top: y,
                  width: w - 2, // 1px border on both sides
                  height: h - 2, // 1px border on both sides
                  border: "1px solid black"
                }}
                onClick={(e) => { e.stopPropagation(); this.props.onSelect(this.props.postIt); }}>

              <div className="handle" style={{height: dragHandleHeight + "px"}}></div>

              {titleElem}

            </div>
          </Resizable>
        </div>
      </DraggableCore>
    </div>;
  }

  onMoveToFront(e) {
    e.stopPropagation();
    this.props.onMoveToFront(this.props.postIt);
  }

  onMoveToBack(e) {
    e.stopPropagation();
    this.props.onMoveToBack(this.props.postIt);
  }

  onDuplicatePostIt(e) {
    e.stopPropagation();
    this.props.onDuplicatePostIt(this.props.postIt);
  }

  onChangeColor(e, color) {
    e.stopPropagation();
    this.props.postIt.color = color;
  }

  onClick(e) {
    e.stopPropagation();
    this.props.onSelect(this.props.postIt);
  }

  onDelete(e) {
    e.stopPropagation();
    const postIt = this.props.postIt;
    this.props.onDeletePostIt(postIt);
  }
}

export default DragSource(ItemTypes.POSTIT, postItSource, collect)(PostIt);
