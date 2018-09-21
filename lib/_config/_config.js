this.Config = {
  // Basic Details
  name: 'Arachnida',
  title: function() {
    return TAPi18n.__('configTitle');
  },
  subtitle: function() {
    return TAPi18n.__('configSubtitle');
  },
  logo: function() {
    return '<b>' + this.name + '</b>';
  },
  footer: function() {
    return this.name + ' - Copyright ' + new Date().getFullYear();
  },
  // Emails
  emails: {
    from: 'no-reply@' + Meteor.absoluteUrl(),
    contact: 'hello' + Meteor.absoluteUrl()
  },
  // Username - if true, users are forced to set a username
  username: false,

  // Localisation
  defaultLanguage: 'en',
  dateFormat: 'D/M/YYYY',
  // Meta / Extenrnal content
  privacyUrl: 'nothing',
  termsUrl: 'nothing',
  //Routes
  homeRoute: '/',
  publicRoutes: ['home'],
  dashboardRoute: '/dashboard'
};
