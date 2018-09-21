Template.editor.events({
  'click .clickOnCodeMirror': function(e,t) {
		var value = t.find("#CodeMirrorId").value;
		Crawlers.update({_id:this.crawlerID}, { $set: {functionToExecute:value} });
		sAlert.success('function updated')
	}
});


Template.editor.helpers({
	newfct: function(){
		return this.fct
	},
	editorOptions: function() {
		return {
			lineNumbers: true,
			mode: "javascript",
			gutters: ["CodeMirror-lint-markers"],
			lint: {
        globalstrict: false,
        strict: false
      }
		}
	}
});
