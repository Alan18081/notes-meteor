import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import moment from 'moment';

export const Notes = new Mongo.Collection('notes');

if(Meteor.isServer) {
  Meteor.publish('notes',function () {
    return Notes.find({userId: this.userId});
  });
}

Meteor.methods({
  'notes.create'() {
    if(!this.userId) {
      throw new Meteor.Error('no-authorized');
    }
    return Notes.insert({
      title: '',
      body: '',
      updatedAt: moment().valueOf()
    });
  },
  'notes.remove'(id) {
    if(!this.userId) {
      throw new Meteor.Error('no-authorized');
    }
    new Schema({
      id: {
        type: String,
        min: 1
      }
    }).validate({id});
    Notes.remove({_id: id, userId: this.userId});
  },
  'notes.update'(id,updates) {
    if(!this.userId) {
      throw new Meteor.Error('no-authorized');
    }
    new Schema({
      id: {
        type: String,
        min: 1
      },
      title: {
        type: String,
        optional: true
      },
      body: {
        type: String,
        optional: true
      }
    }).validate({id,...updates});

    Notes.update({
      _id: id,
      userId: this.userId
    },{
      $set: {
        updatedAt: moment().valueOf(),
        ...updates
      }
    });
  }
});