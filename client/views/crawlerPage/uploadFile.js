Template.uploadFile.events({
  'click .submitFile': function(e,t) {
    let crawlerID = this.crawlerID

		t.$("input[type=file]").parse({
			config: {
				complete: function(results, file) {
          console.log("This file done:", file, results);
          if (file.type !== 'text/csv' || !results.data) {
            console.log('not a CSV');
            sAlert.error('not a CSV')
            return {'valid':false,'problem':'not a CSV'}
          }

          //test if every element is only a string beging with http
          if (!results.data.every(function(row){ return Array.isArray(row) && row.length === 1 })) {
            console.log('only 1 column is expected');
            sAlert.error('only 1 column is expected')
            return {'valid':false,'problem':'only 1 column is expected'}
          }

          if (!results.data.every(function(row){ return typeof row[0] === "string" })) {
            console.log('some rows are not strings');
            sAlert.error('some rows are not strings')
            return {'valid':false,'problem':'some rows are not strings'}
          }

          if (!results.data.every(function(row){ return row[0].substring(0,4) === "http" })) {
            console.log('urls must start with http');
            sAlert.error('urls must start with http')
            return {'valid':false,'problem':'all urls must start with http'}
          }
          Meteor.call('uploadFile', {'results':results,'crawlerID':crawlerID}, (err, res) => {
              if (err) { console.log(err);
              }else{ console.log(res);
              }
          })
        }
			},
      download: true,
    	// step: function(row) {
    	// 	console.log("Row:", row);
    	// },
			complete: function() {
				console.log("All files done!");
			}
		});
	}
});
