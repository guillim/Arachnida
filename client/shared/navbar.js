Template.navbar.events({
  'change #sliding-menu-controller': function(e) {
    return $('body')[e.currentTarget.checked ? 'addClass' : 'removeClass']('no-overflow');
  },
  'click .sliding-menu a': function() {
    return $('#sliding-menu-controller').prop('checked', false);
  }
});
