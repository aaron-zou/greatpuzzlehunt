import { Meteor } from 'meteor/meteor';
import { isAdmin } from '../../lib/imports/method-helpers.js';

Meteor.publish('admin.teams', function() {
  return isAdmin(this.userId) ? Teams.find({}) : this.ready();
});

Meteor.publish('teams.myTeam', function() {
  const { userId } = this;

  if (!userId) {
    return this.ready();
  }

  return Teams.find({
    members: userId,
  });
});

Meteor.publish('teams.browse', function() {
  return Teams.find({}, {
    fields: {
      name: 1,
      members: 1,
      updatedAt: 1,
      division:1,
    },
  });
});