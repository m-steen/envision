import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {observable, transaction, computed} from 'mobx';
import {observer} from 'mobx-react';
import {Resizable} from 'react-resizable';
import {DraggableCore} from 'react-draggable';

function onResize(e, postIt, size) {
  event.preventDefault();
  postIt.w = size.width;
  postIt.h = size.height;
}

function handleDrop(fn, postIt, dragInfo) {
  setTimeout(() => fn(postIt, dragInfo.x, dragInfo.y, dragInfo.deltaX, dragInfo.deltaY), 1);
}

@observer
class PostIt extends Component {
  componentDidMount() {
    const selected = this.props.isSelected(this.props.postIt);
    if (selected) {
      const node = ReactDOM.findDOMNode(this.refs.postItInput);
      //node.focus();
      //node.select();
    }
  }

  componentDidUpdate() {
    const selected = this.props.isSelected(this.props.postIt);
    if (selected) {
      const node = ReactDOM.findDOMNode(this.refs.postItInput);
      //node.focus();
      //node.select();
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
    const selected = this.props.isSelected(this.props.postIt);
    const dragHandleHeight = 12;

    const toolBarElem = selected?
      <div className="toolbar" style={{
          position: 'absolute',
          left: x,
          top: y - 40
        }}>
        <div>
          <a className="color-button handle" onClick={(e) => e.stopPropagation()}><i className="fa fa-arrows" style={{fontSize: "18px", padding: "1px", width: "18px", textAlign: "center", cursor: "pointer"}}></i></a>
          <a className="color-button" onClick={(e) => this.onDelete(e)}><i className="fa fa-remove" style={{fontSize: "18px", padding: "1px", width: "18px", textAlign: "center", cursor: "pointer"}}></i></a>
          <a className="color-button" onClick={(e) => this.onMoveToFront(e)}><p style={{fontSize: "18px", padding: "1px", margin: "0px", width: "18px", textAlign: "center", cursor: "pointer"}}>F</p></a>
          <a className="color-button" onClick={(e) => this.onMoveToBack(e)}><p style={{fontSize: "18px", padding: "1px", margin: "0px", width: "18px", textAlign: "center", cursor: "pointer"}}>B</p></a>
          <a className="color-button" onClick={(e) => this.onDuplicatePostIt(e)}><i className="fa fa-files-o" style={{fontSize: "18px", padding: "1px", width: "18px", textAlign: "center", cursor: "pointer"}}></i></a>
          <a onClick={(e) => this.onChangeColor(e, "orange")} className="color-button orange"></a>
          <a onClick={(e) => this.onChangeColor(e, "blue")} className="color-button blue"></a>
          <a onClick={(e) => this.onChangeColor(e, "yellow")} className="color-button yellow"></a>
          <a onClick={(e) => this.onChangeColor(e, "green")} className="color-button green"></a>
          <a onClick={(e) => this.onChangeColor(e, "pink")} className="color-button pink"></a>
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
          onDrag={(e, dragInfo) => this.handleDrag(e, dragInfo)}
          onStop={(e, dragInfo) => handleDrop(this.props.onDropPostIt, this.props.postIt, dragInfo)}>

        <div>
          {toolBarElem}

          <Resizable height={h} width={w} minConstraints={[98, 50]} onResize={(event, {size}) => onResize(event, this.props.postIt, size)}>
            <div className={"postit " + color + (selected? " selected" : "")} style={{
                  position: 'absolute',
                  left: x,
                  top: y,
                  width: w - 2, // 1px border on both sides
                  height: h - 2, // 1px border on both sides
                }}
                onClick={(e) => { e.stopPropagation(); this.props.onSelect(this.props.postIt); }}>

              <div className="handle"></div>

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

  handleDrag(e, dragInfo) {
    e.preventDefault();
    //       transaction(() => {
    const postIt = this.props.postIt;
    postIt.x += dragInfo.deltaX;
    postIt.y += dragInfo.deltaY;
    this.props.onDragPostIt(postIt, dragInfo.x, dragInfo.y);
  }
}

export default PostIt;
