Template.crawler.events({
  'click .deleteCrawler': function() {
    console.log(this._id);
		Crawlers.remove(this._id)
		Meteor.call('removeStartURLs', this._id, (err, res) => {
				if (err) { console.log(err);
				}else{ console.log(res);
				}
		})
  }
});


Template.crawler.helpers({
	urlExample: function(){
		return Starturls.findOne({crawlerID:this._id}).URL
	},
});
