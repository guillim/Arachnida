// You'll want to replace these functions. They publish the whole
// collection which is problematic after your app grows

// Publishing Posts
Meteor.publish('posts', function() {
  return Posts.find();
});
// Publishing crawlers
Meteor.publish('crawlers', function() {
  return Crawlers.find({owner:this.userId});
});
// Publishing urls
Meteor.publish('starturls', function(_id) {
  return Starturls.find({crawlerID:_id},{limit:20});
});
// Publishing results of all the crawls
Meteor.publish('resultsAllcrawls', function(_id) {
  return Resulturls.find({crawlerID:_id},{limit:10000,reactive:false,fields:{"_id":1,"crawlerID":1,"crawlID":1,"createdAt":1,"URL_crawled":1},sort:{createdAt:-1}})
});
// Publishing result of a single crawl
Meteor.publish('resultsOnecrawl', function(_id) {
  return Resulturls.find({crawlID:_id},{limit:1,reactive:false,fields:{"_id":1,"crawlerID":1,"crawlID":1,"createdAt":1,"URL_crawled":1,"result":1},sort:{createdAt:-1}})
});
// Publishing user/s
Meteor.publish('user', function() {
  return Meteor.users.find({
    _id: this.userId
  });
});
