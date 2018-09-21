this.Starturls = new Meteor.Collection('starturls');

Schemas.Starturls = new SimpleSchema({
  URL:{
    type: String,
  },
  createdAt: {
    optional: true,
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
  crawlerID:{
    type: String,
    optional: true,
  },
  owner: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    autoValue: function() {
      if (this.isInsert) {
        return Meteor.userId();
      }
    },
  }
});

Starturls.attachSchema(Schemas.Starturls);

if (Meteor.isServer) {
    ReactiveTable.publish("allStarturls", this.Starturls);
    ReactiveTable.publish("userStarturls", this.Starturls, function () {
      return {"owner": Meteor.userId(),"crawlerID":Meteor.user().crawlerID};
    }, {fields: { URL:1}} );
}
