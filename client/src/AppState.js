import { observable } from 'mobx';
import bmcModel from './model/bmcModel';

const store = observable({
  model: new bmcModel('Your Business Model'),
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
