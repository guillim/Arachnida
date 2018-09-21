var onAfterAction, publicRoutes;

this.subs = new SubsManager();

Router.configure({
  layoutTemplate: "masterLayout",
  loadingTemplate: "loading",
  notFoundTemplate: "notFound",
  routeControllerNameConverter: "camelCase",
  onBeforeAction: function() {
    // Redirect to set username if required
    if (Config.username && Meteor.userId() && !Meteor.user().username) {
      this.redirect('/setUserName');
    }
    return this.next();
  }
});

Router.waitOn(function() {
  return subs.subscribe('user');
});

onAfterAction = function() {
  var $bd;
  if (Meteor.isClient) {
    window.scrollTo(0, 0);
    // Remove modal
    $bd = $('.modal-backdrop');
    $bd.removeClass('in');
    return setTimeout(function() {
      return $bd.remove();
    }, 300);
  }
};

Router.onAfterAction(onAfterAction);

//To allow non-logged in users to access more routes, add it in the _config.coffee file
publicRoutes = _.union(Config.publicRoutes || [], ['home', 'atSignIn', 'atSignUp', 'atForgotPassword', 'atSignOut']);

Router.plugin('ensureSignedIn', {
  except: publicRoutes
});
