import React from 'react';
import expect from 'expect';
import {Meteor} from 'meteor/meteor';
import {mount} from 'enzyme';
import moment from 'moment';

import NotesItem from './NotesItem';

if(Meteor.isClient) {
  describe('Notes item', () => {
    it('should render title inside h3', () => {
      const title = 'New title';
      const updatedAt = moment().valueOf();
      const wrapper = mount(<NotesItem note={{title,updatedAt}}/>);
      expect(wrapper.find('h4').text()).toBe(title);
      expect(wrapper.find('p').text()).toBe(`Updated ${moment(updatedAt).fromNow()}`);
    });

    it('should set default title if no title set', () => {
      const title = '';
      const updatedAt = moment().valueOf();
      const wrapper = mount(<NotesItem note={{title,updatedAt}}/>);
      expect(wrapper.find('h4').text()).toBe('Untitled note');
    });
  });
}