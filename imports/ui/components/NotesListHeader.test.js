import React from 'react';
import {Meteor} from 'meteor/meteor';
import expect from 'expect';
import {mount} from 'enzyme';

import {NotesListHeader} from './NotesListHeader';

if(Meteor.isClient) {
  describe('Notes list', () => {

    it('should call insert method', () => {
      const spy = expect.createSpy();
      const wrapper = mount(<NotesListHeader createNote={spy}/>);
      wrapper.find('button').simulate('click');
      expect(spy).toHaveBeenCalled();
    });

  });
}