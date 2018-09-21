this.Resulturls = new Meteor.Collection('resulturls');

Schemas.Resulturls = new SimpleSchema({
  URL_crawled:{
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
  crawlerID:{
    type: String,
    optional: true,
  },
  crawlID:{
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
  },
  result:{
    type: Object,
    blackbox: true,
    optional: true,
  },
  fullResult:{
    type: Object,
    blackbox: true,
    optional: true,
  }
});

Resulturls.attachSchema(Schemas.Resulturls);


if (Meteor.isServer) {
    ReactiveTable.publish("crawlPageResultsOnecrawlsimple", this.Resulturls, function () {
      return {"owner": Meteor.userId(),"crawlID":Meteor.user().crawlID};
    }, {fields:{"_id":1,"crawlerID":1,"crawlID":1,"createdAt":1,"URL_crawled":1,"result":1}} );
}
