import {Map, List, fromJS} from 'immutable';
import {expect} from 'chai';
import {addCard} from '../src/core';

describe('BMC logic', () => {

  describe('add card', () => {

    it('adds a new card to an empty collection of cards', () => {
      const state = Map({postIts: List()});
      const nextState = addCard(state, 10, 10, 30, 30, 'yellow', 'some text');

      expect(nextState).to.equal(fromJS({
        postIts: [
          {pid: 0, x: 10, y: 10, width: 30, height: 30, color: 'yellow', title: 'some text'}
        ]
      }));
    });

    it('adds a new card to an existing collection of cards', () => {
      const state = fromJS({
        postIts: [
          {pid: 0, x: 10, y: 10, width: 30, height: 30, color: 'yellow', title: 'some text'},
          {pid: 1, x: 20, y: 20, width: 30, height: 30, color: 'yellow', title: 'some text'}
        ]
      });
      const nextState = addCard(state, 30, 30, 30, 30, 'yellow', 'some text');

      expect(nextState).to.equal(fromJS({
        postIts: [
          {pid: 0, x: 10, y: 10, width: 30, height: 30, color: 'yellow', title: 'some text'},
          {pid: 1, x: 20, y: 20, width: 30, height: 30, color: 'yellow', title: 'some text'},
          {pid: 2, x: 30, y: 30, width: 30, height: 30, color: 'yellow', title: 'some text'}
        ]
      }));
    });
  });
});
