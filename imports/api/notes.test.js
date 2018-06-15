import expect from 'expect';
import {Meteor} from 'meteor/meteor';
import {Notes} from './notes';

if(Meteor.isServer) {
  describe('Notes', function () {
    const noteOne = {
      _id: 'testNoteId1',
      title: 'New title',
      body: 'Some body text',
      updatedAt: 0,
      userId: 'testUserId1'
    };
    const noteTwo = {
      _id: 'testNoteId2',
      title: 'New title',
      body: 'Some body text',
      updatedAt: 0,
      userId: 'testUserId2'
    }
    beforeEach(function() {
      Notes.remove({});
      Notes.insert(noteOne);
      Notes.insert(noteTwo);
    });
    it('should insert new note', function () {
      const userId = 'testId';
      const id = Meteor.server.method_handlers['notes.create'].apply({userId});
      expect(Notes.findOne({_id: id, userId})).toExist();
    });

    it('should not insert node if not authenticated', function () {
      expect(() => {
        Meteor.server.method_handlers['notes.create']();
      }).toThrow();
    });

    it('should remove note', function () {
      Meteor.server.method_handlers['notes.remove'].apply({userId: noteOne.userId},[noteOne._id]);
      expect(Notes.findOne({_id: noteOne._id})).toNotExist();
    });

    it('should not remove note if not authorized', function () {
      expect(() => {
        Meteor.server.method_handlers['notes.remove'].apply({},[noteOne._id]);
      }).toThrow();
    });

    it('should not remove note if invalid _id', function () {
      expect(() => {
        Meteor.server.method_handlers['notes.remove']
          .apply({userId: noteOne.userId},[]);
      }).toThrow();
    });

    it('should update note', function () {
      const title = 'Updated title';
      Meteor.server.method_handlers['notes.update']
        .apply({userId: noteOne.userId}, [noteOne._id,{title}]);
      const note = Notes.findOne({_id: noteOne._id});
      expect(note.updatedAt).toBeGreaterThan(0);
      expect(note).toInclude({title, body: noteOne.body});
    });

    it('throw an error if extra updates provided', function () {
      expect(() => {
        Meteor.server.method_handlers['notes.update']
          .apply({userId: noteOne.userId},[noteOne._id,{
            title: 'New title',
            name: 'Alan'
          }])
      }).toThrow();
    });

    it('should not update note if user was not a creator', function () {
      const title = 'Updated title';
      Meteor.server.method_handlers['notes.update']
        .apply({userId: 'testId'}, [noteOne._id,{title}]);
      const note = Notes.findOne({_id: noteOne._id});
      expect(note).toInclude(noteOne);
    });

    it('should not update note if not authorized', function () {
      expect(() => {
        Meteor.server.method_handlers['notes.update'].apply({},[noteOne._id, {
          title: 'New title'
        }]);
      }).toThrow();
    });

    it('should not update note if invalid _id', function () {
      expect(() => {
        Meteor.server.method_handlers['notes.update']
          .apply({userId: noteOne.userId},[null,{
            title: 'New title'
          }]);
      }).toThrow();
    });

    it('should return a user notes', function () {
      const notes = Meteor.server.publish_handlers.notes
        .apply({useId: noteOne.userId}).fetch();

      expect(notes.length).toBe(1);
      expect(notes[0]).toEqual(noteOne);
    });

    it('should return no notes for user that doesn\'t have notes ', function () {
      const notes = Meteor.server.publish_handlers.notes
        .apply({useId: 'some id'}).fetch();

      expect(notes.length).toBe(0);
    });

  });
}