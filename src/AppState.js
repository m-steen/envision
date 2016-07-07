import { observable } from 'mobx';

const store = observable({
  title: 'Business Model Canvas',
  containers: [
    {id: guid(), x:  50, y:  50, width: 200, height: 500, title: 'Key Partners', postIts: []},
    {id: guid(), x: 250, y:  50, width: 200, height: 250, title: 'Key Activities', postIts: [
      {pid: guid(), x: 50, y: 50, width: 100, height: 100, color: 'yellow', title: 'Post It!'}
    ]},
    {id: guid(), x: 250, y: 300, width: 200, height: 250, title: 'Key Resources', postIts: []},
    {id: guid(), x: 450, y:  50, width: 200, height: 500, title: 'Value Propositions', postIts: []},
    {id: guid(), x: 650, y:  50, width: 200, height: 250, title: 'Customer Relationships', postIts: []},
    {id: guid(), x: 650, y: 300, width: 200, height: 250, title: 'Channels', postIts: []},
    {id: guid(), x: 850, y:  50, width: 200, height: 500, title: 'Customer Segments', postIts: []},
    {id: guid(), x:  50, y: 550, width: 500, height: 250, title: 'Cost Structure', postIts: []},
    {id: guid(), x: 550, y: 550, width: 500, height: 250, title: 'Revenue Streams', postIts: []}
  ],
  selection: null
});

export function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

export default store;
/*
class AppState {
  @observable timer = 0;

  constructor() {
    setInterval(() => {
      this.timer += 1;
    }, 1000);
  }

  resetTimer() {
    this.timer = 0;
  }
}

export default AppState;
*/
