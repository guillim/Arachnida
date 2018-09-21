Template.home.rendered = function() {
  var options, w, winHeight, winWidth;
  w = new WOW().init();
  // TODO: End after home destroyed

  // make sure div stays full width/height on resize
  // global vars
  winWidth = $(window).width();
  winHeight = $(window).height();
  // set initial div height / width
  $("#intro").css.width = winWidth
  $("#intro").css.height= winHeight

  //Skroll doesn't work so well on mobile imo
  if (!Utils.isMobile) {
    options = {
      forceHeight: false,
      smoothScrolling: false
    };
    return skrollr.init(options).refresh();
  }
};

Template.home.destroyed = function() {
  //For Skrollr
  return $('body').attr('style', '');
};


Template.home.events({
  'click .fa-plane': function() {
    console.log('click crawler1');
    Meteor.call('crawler1');
    console.log('clicked done, now we wait');
  }
});


Template.home.events({
  'click .fa-bolt': function() {
    console.log('click crawlerURL1');
    Meteor.call('crawlerURL1');
    console.log('clicked done, now we wait');
  }
});
