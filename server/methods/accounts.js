Meteor.methods({
  deleteAccount: function(userId) {
    if (this.userId === userId) {
      return Meteor.users.remove({
        _id: this.userId
      });
    }
  },
  uploadFile: function(obj) {
    let crawlerID = obj.crawlerID
    let results = obj.results
    try {
      results.data.forEach((row) => {
        Starturls.insert({
          URL:row[0],
          crawlerID:crawlerID
        })
      });
      return true
    } catch (e) {
      console.log('uploadFile error',e);
      return false
    }
  },
  removeStartURLs: function(crawlerID){
    check(crawlerID, String)
    return Starturls.remove({crawlerID:crawlerID})
  },
  removeResults: function(crawlID){
      check(crawlID, String)
      return Resulturls.remove({crawlID:crawlID})
  },
  removeResult: function(_id){
      check(_id, String)
      return Resulturls.remove(_id)
    },
});
