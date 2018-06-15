import React from 'react';
import {Meteor} from 'meteor/meteor';
import {withTracker} from 'meteor/react-meteor-data';
import {Notes} from '../../api/notes';

import NotesListHeader from './NotesListHeader';

export const NotesList = ({notes}) => (
  <div>
    <NotesListHeader/>
    Notes
  </div>
);

export default withTracker(() => {
  Meteor.subscribe('notes');
  return {
    notes: Notes.find().fetch()
  }
},NotesList);