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

Template.crawlPageResultsOnecrawlsimple.events({
  'click .downloadCrawl': function() {
	let csvData = `URL,${this.listColumns.join()}\n`;

	let alreadyin = []
	let ResulturlsCollection = []
	Resulturls.find({crawlerID:this.crawlerID},{sort: {createdAt: -1}}).fetch().map((resulturl)=>{
	if (alreadyin.indexOf(resulturl.crawlID) === -1) {
		alreadyin.push(resulturl.crawlID)
		ResulturlsCollection.push(resulturl)
	}
	})
	for (let indexCollection = 0; indexCollection < ResulturlsCollection.length; indexCollection++) {
		const elementCollection = ResulturlsCollection[indexCollection];
		csvData += elementCollection.URL_crawled;
		for (let indexColumn = 0; indexColumn < this.listColumns.length; indexColumn++) {
			const elementColumn = this.listColumns[indexColumn];
			if(elementCollection.result[elementColumn]) {
				csvData+=`,${elementCollection.result[elementColumn]}`;
			}else {
				csvData+=`,`;
			}
		}
		csvData+='\n';
	}
	const hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvData);
    hiddenElement.target = '_blank';
    hiddenElement.download = `${this.title}.csv`;
    hiddenElement.click();

		/* Meteor.call('removeResults', this.crawlID, (err, res) => {
				if (err) { console.log(err);
				}else{ console.log(res);
				}
		}) */
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
