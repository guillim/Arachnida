Template.crawlerPagestartURL.helpers({
	crawlerInfo: function() {
    return this.crawlerPage[0];
  },
	settings: function () {
	        return {
	            rowsPerPage: 5,
	            showFilter: true,
							multiColumnSort: false,
							sortable: false,
							fields:  [ {'key':'URL','label':'URL','tmpl':Template.templateForCellReactiveTable} ]
	        };
  }
});
