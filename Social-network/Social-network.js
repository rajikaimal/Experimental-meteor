Users = new Mongo.Collection('Users');
Feed = new Mongo.Collection('Feed');

if (Meteor.isClient) {

  Router.route('/home'); 

  Router.route('/settings'); 

  Router.configure({
    layoutTemplate : 'main'
  });


  Template.home.events({
    'submit .posttowall': function(event){
      event.preventDefault();
      var postWall = event.target.posting.value;
      Feed.insert({ postId : Meteor.userId() , post : postWall });
    }
  });

  Template.newsFeed.helpers({
    feed : function(){
      return Feed.find({ postId : Meteor.userId() });
    }
  });

  Template.newsFeed.events({
    'click .removePost' : function(event){
      Feed.remove(this._id);
    }
  });

  Template.settings.helpers({
    userInfo : function(){
      console.log(Users.find({ postId : Meteor.userId() }));
      return Users.findOne({ _id : Meteor.userId() });
    }
  });

  Template.settings.events({
    'submit .settings-form' : function(event){
      event.preventDefault();
      var age = event.target.age.value;
      var hobby = event.target.hobby.value;
      if(age == "" || hobby == ""){
        alert("Fill all");
      }

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
