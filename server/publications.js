Meteor.publish('teams', function(){
  return Teams.find();
});
