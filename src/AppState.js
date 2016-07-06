import { observable } from 'mobx';

const store = observable({
  title: 'Business Model Canvas',
  postIts: [{
    "1": {pid: "1", x: 50, y: 50, width: 100, height: 100, color: 'yellow', container: "2", title: 'Post It!'}
  }],
  containers: [
    {id: "1", x:  50, y:  50, width: 200, height: 500, title: 'Key Partners'},
    {id: "2", x: 250, y:  50, width: 200, height: 250, title: 'Key Activities'},
    {id: "3", x: 250, y: 300, width: 200, height: 250, title: 'Key Resources'},
    {id: "4", x: 450, y:  50, width: 200, height: 500, title: 'Value Propositions'},
    {id: "5", x: 650, y:  50, width: 200, height: 250, title: 'Customer Relationships'},
    {id: "6", x: 650, y: 300, width: 200, height: 250, title: 'Channels'},
    {id: "7", x: 850, y:  50, width: 200, height: 500, title: 'Customer Segments'},
    {id: "8", x:  50, y: 550, width: 500, height: 250, title: 'Cost Structure'},
    {id: "9", x: 550, y: 550, width: 500, height: 250, title: 'Revenue Streams'}
  ]
});

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