Template.crawl.events({
  'click .deleteCrawl': function() {
    console.log(this.crawlID);
		Meteor.call('removeResults', this.crawlID, (err, res) => {
				if (err) { console.log(err);
				}else{ console.log(res);
				}
		})
  }
});

Template.crawlPageResultsOnecrawlsimple.helpers({
	settings: function () {
          let fieldsArray = []
          fieldsArray.push({'key':'URL_crawled','label':'URL'})

          this.listColumns.forEach((key) => {
            fieldsArray.push({'key':'result.'+key,'label':key})
          })

          fieldsArray.push({'key':'','label':'Action','tmpl':Template.templateForCellReactiveTableSimpleAct})

	        return {
	            rowsPerPage: 5,
	            showFilter: true,
							multiColumnSort: false,
							sortable: false,
							fields:  fieldsArray
	        };
  }
});
