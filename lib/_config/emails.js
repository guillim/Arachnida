var options;

if (Meteor.isServer) {
  options = {
    siteName: Config.name
  };
  PrettyEmail.options = options;
}
