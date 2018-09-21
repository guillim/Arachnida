Template.templateForCellReactiveTable.events({
  'click .toogleClass1': function(e,t) {
		t.$(e.currentTarget).addClass('hidden');
		t.$('.toogleClass2').removeClass('hidden');
	},
	'click .btn-primary': function(e,t) {
		t.$('.toogleClass2').addClass('hidden');
		t.$('.toogleClass1').removeClass('hidden');
	}
});
