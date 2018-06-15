import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

const NotesItem = ({note}) => (
  <li>
    <h4>{note.title || 'Untitled note'}</h4>
    <p>Updated {moment(note.updatedAt).fromNow()}</p>
  </li>
);

NotesItem.propTypes = {
  note: PropTypes.object.isRequired
};

export default NotesItem;