this.Crawlers = new Meteor.Collection('crawlers');

Schemas.Crawlers = new SimpleSchema({
  title: {
    type: String,
    max: 60
  },
  status: {
    type: String,
    max: 60,
    autoValue: function() {
      if (this.isInsert) {
        return 'Ready';
      }
    },
  },
  content: {
    type: String,
    optional: true,
    autoform: {
      rows: 5
    }
  },
  functionToExecute: {
    type: String,
    optional: true,
    autoform: {
      rows: 15
    }
  },
  createdAt: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      }
    }
  },
  updatedAt: {
    type: Date,
    optional: true,
    autoValue: function() {
      if (this.isUpdate) {
        return new Date();
      }
    }
  },
  owner: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    autoValue: function() {
      if (this.isInsert) {
        return Meteor.userId();
      }
    },
    autoform: {
      options: function() {
        return _.map(Meteor.users.find().fetch(), function(user) {
          return {
            label: user.emails[0].address,
            value: user._id
          };
        });
      }
    }
  }
});

Crawlers.attachSchema(Schemas.Crawlers);
