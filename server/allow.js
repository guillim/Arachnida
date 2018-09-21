Posts.allow({
  insert: function(userId, doc) {
    return userId === doc.owner;
  },
  update: function(userId, doc, fields, modifier) {
    return userId === doc.owner;
  },
  remove: function(userId, doc) {
    return userId === doc.owner;
  }
});



Crawlers.allow({
  insert: function(userId, doc) {
    return userId === doc.owner;
  },
  update: function(userId, doc, fields, modifier) {
    return userId === doc.owner;
  },
  remove: function(userId, doc) {
    return userId === doc.owner;
  }
});


Starturls.allow({
  insert: function(userId, doc) {
    return true;
  },
  update: function(userId, doc, fields, modifier) {
    return true;
  },
  remove: function(userId, doc) {
    return true;
  }
});


Resulturls.allow({
  insert: function(userId, doc) {
    return true;
  },
  update: function(userId, doc, fields, modifier) {
    return true;
  },
  remove: function(userId, doc) {
    return true;
  }
});



Meteor.users.allow({
  update: function(userId, doc, fieldNames, modifier) {
    if (userId === doc._id && !doc.username && fieldNames.length === 1
      && (fieldNames[0] === 'username'
        || fieldNames[0] === 'crawlerID'
        || fieldNames[0] === 'crawlID')
    ) {
      return true;
    } else {
      return false;
    }
  }
});
