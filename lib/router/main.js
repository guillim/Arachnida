Router.map(function() {
  this.route("home", {
    path: "/",
    layoutTemplate: "homeLayout"
  });
  this.route("dashboard", {
    path: "/dashboard",
    waitOn: function() {
      return [subs.subscribe('posts'), subs.subscribe('crawlers')];
    },
    data: function() {
      return {
        posts: Posts.find({}, {
          sort: {
            createdAt: -1
          }
        }).fetch(),
        crawlers: Crawlers.find({}, {sort: {createdAt: -1}}).fetch()
      };
    }
  });
  this.route("crawlerPage", {
    path: "/crawlerPage/:_id",
    waitOn: function() {
      return [subs.subscribe('crawlers')];
    },
    data: function() {
      return  {crawlerPage: Crawlers.find({_id:this.params._id}, {fields: {startURL:0}, sort: {createdAt: -1} }).fetch()};
    }
  });
  this.route("crawlerPagestartURL", {
    path: "/crawlerPage/startURL/:_id",
    waitOn: function() {
      return [subs.subscribe('crawlers')];
    },
    data: function() {
      return  {
        crawlerPage: Crawlers.find({_id:this.params._id}, {fields: {startURL:0} }).fetch(),
        // starturls: Starturls.find({crawlerID:this.params._id}, {limit:1000}).fetch(),  //ne pas subscripbe sinon on plante tout car trop de url...
      };
    },
    action: function(){
      Meteor.users.update({_id:Meteor.user()._id}, { $set: {crawlerID:this.params._id} });
      this.render();
    }
  });
  this.route("crawlerPageResultsAllcrawls", {
    path: "/crawlerPage/crawlerPageResultsAllcrawls/:_id",
    waitOn: function() {
      return [subs.subscribe('crawlers'),subs.subscribe('resultsAllcrawls',this.params._id)];
    },
    data: function() {
      let alreadyin = []
      let ResulturlsCollection2 = []
      let ResulturlsCollection = Resulturls.find({crawlerID:this.params._id},{sort: {createdAt: -1}}).fetch().map((resulturl)=>{
        if (alreadyin.indexOf(resulturl.crawlID) === -1) {
          alreadyin.push(resulturl.crawlID)
          ResulturlsCollection2.push(resulturl)
        }
      })
      return  {
        crawlerPage: Crawlers.findOne({_id:this.params._id}),
        crawls: ResulturlsCollection2,
      };
    },
    action: function(){
      Meteor.users.update({_id:Meteor.user()._id}, { $set: {crawlerID:this.params._id} });
      this.render();
    }
  });
  this.route("crawlPageResultsOnecrawlsimple", {
    path: "/crawlerPage/crawlPageResultsOnecrawlsimple/:_id",
    waitOn: function() {
      return [subs.subscribe('crawlers') ,subs.subscribe('resultsOnecrawl',this.params._id)];
    },
    data: function() {
      let resultInfo = Resulturls.findOne({crawlID:this.params._id}, {fields: {crawlerID:1,result:1,title:1} })
      return  {
        title: (resultInfo) ? Crawlers.findOne({_id:resultInfo.crawlerID}, {fields: {title:1} }).title : '',
        listColumns: (resultInfo) ? Object.keys(resultInfo.result) : [],
        crawlerID: (resultInfo) ? resultInfo.crawlerID : '',
      };
    },
    action: function(){
      Meteor.users.update({_id:Meteor.user()._id}, { $set: {crawlID:this.params._id} });
      this.render();
    }
  });
});
