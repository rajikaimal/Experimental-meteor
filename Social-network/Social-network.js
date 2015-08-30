Users = new Mongo.Collection('Users');

if (Meteor.isClient) {
  Router.route('/register');

  Router.route('/login');

  Router.route('/home'); 

  Router.route('/settings'); 

  Router.configure({
    layoutTemplate : 'main'
  });

  Template.settings.helpers({
    userInfo : function(){
      console.log(Users.find({ _id : Meteor.userId() }));
      return Users.findOne({ _id : Meteor.userId() });
    }
  });

  Template.settings.events({
    'submit .settings-form' : function(event){
      event.preventDefault();
      var age = event.target.age.value;
      var hobby = event.target.hobby.value;
      Users.update( {_id : Meteor.userId()} ,{ $set : { age : age , hobby : hobby }});

      event.target.age.value = "";
      event.target.hobby.value = "";
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
