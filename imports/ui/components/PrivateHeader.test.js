import {Meteor} from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import {mount} from 'enzyme';

import {PrivateHeader} from './PrivateHeader';

if(Meteor.isClient) {
  describe('PrivateHeader', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(<PrivateHeader title="Test title" handleLogout={() => {}}/>);
    });

    it('should set button to logout', () => {
      expect(wrapper.find('button').text()).toBe('Logout');
    });

    it('should use title prop as h1 text', () => {
      expect(wrapper.find('h1').text()).toBe('Test title');
    });

    it('should call a function on click', () => {
      const spy = expect.createSpy();
      wrapper = mount(<PrivateHeader title="New title" handleLogout={spy}/>);
      wrapper.find('button').simulate('click');
      expect(spy).toHaveBeenCalled();
    });

  });
}