Template.teams.helpers({
  isCreatingTeam: function(){
    return Session.get('isCreatingTeam');
  },

  teams: function(){
    return Teams.find();
  } 
});

Template.teams.events({
  'click a.create': function(e, tpl){
    e.preventDefault();
    Session.set('isCreatingTeam', true);
  },

  'click a.cancel': function(e, tpl){
    e.preventDefault();
    Session.set('isCreatingTeam', false);
  },

  'submit form.create-team': function(e, tpl){
    e.preventDefault();

    var team = {
      name: tpl.$('input[name=name]').val(),
      ownerId: Meteor.userId()
    };

    Teams.insert(team, function(error, _id){
      if(error){
        alert(error);
        Session.set('isCreatingTeam', true);
        Tracker.afterFlush(function(){
          tpl.$('input[name=name]').val(team.name);
        });
      }
    });

    Session.set('isCreatingTeam', false);
  }
});
