import React from 'react';
import {Meteor} from 'meteor/meteor';
import {withTracker} from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

export const NotesListHeader = ({createNote}) => (
  <div>
    <button onClick={() => createNote()}>Create note</button>
  </div>
);

NotesListHeader.propTypes = {
  createNote: PropTypes.func.isRequired
};

export default withTracker(() => ({
  createNote: () => Meteor.call('notes.create')
}),NotesListHeader);