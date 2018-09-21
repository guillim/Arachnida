Template.crawlerPage.helpers({
  crawlerInfo: function() {
    return this.crawlerPage[0];
  },
  status: function() { return (this.crawlerPage[0]) ? this.crawlerPage[0].status : false},
  statusIsReady: function() { return (this.crawlerPage[0] && this.crawlerPage[0].status === 'Ready') ? true:false},
});

Template.crawlerPage.events({
  'click .launch': function() {
    let obj = {}
    obj._id = this.crawlerPage[0]._id
    obj.oneOrall = 'all'
    return Meteor.call('crawlerURL1', obj);
  },
  'click .launch1': function() {
    let obj = {}
    obj._id = this.crawlerPage[0]._id
    obj.oneOrall = 'one'
    return Meteor.call('crawlerURL1', obj );
  }

});
