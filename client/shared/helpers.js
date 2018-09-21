Template.registerHelper('Config', function() {
  return Config;
});

Template.registerHelper('Schemas', function() {
  return Schemas;
});

Template.registerHelper('Utils', function() {
  return Utils;
});

Template.registerHelper('currentRoute', function() {
  if (Router && Router.current && Router.current()) {
    return Router.current();
  }
});

Template.registerHelper('isRouteReady', function() {
  return Router && Router.current && Router.current() && Router.current()._waitlist._notReadyCount === 0;
});
