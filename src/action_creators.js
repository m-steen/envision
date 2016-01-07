export function addCard(x, y, width, height, color, title) {
  return {
    type: 'ADD_CARD',
    x: x,
    y: y,
    width: width,
    height: height,
    color: color,
    title: title
  };
}

export function moveCard(pid, container, x, y) {
  return {
    type: 'MOVE_CARD',
    pid: pid,
    container: container,
    x: x,
    y: y
  }
}
