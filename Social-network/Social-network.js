if (Meteor.isClient) {
  Router.route('/register');

  Router.route('/login');

  Router.route('/home');  

  Router.configure({
    layoutTemplate : 'main'
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
