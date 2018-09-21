if (Meteor.isServer) {
  Meteor.startup(function() {
    // Set the social login credentials credentials
    // See /private/settings/dev.json for an example
    if (Meteor.settings && Meteor.settings.serviceConfigurations) {
      return _.each(Meteor.settings.serviceConfigurations, function(config, service) {
        return ServiceConfiguration.configurations.upsert({
          service: service
        }, {
          $set: config
        });
      });
    }
  });
}
