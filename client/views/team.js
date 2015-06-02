Template.team.helpers({
  isEditingTeam: function(){
    return Session.get('editedTeamId') === this._id;
  }
});

Template.team.events({
  "click a.edit": function(e, tpl){
    e.preventDefault();
    Session.set('editedTeamId', this._id);
  },
 
  "submit form.form-edit": function(e, tpl){
    e.preventDefault();
 
    var teamName = tpl.$('input[name=name]').val();
    var self = this;

    if(teamName.length){
      Meteor.call("teamUpdate", this._id, teamName, function(error){
        if(error){
          alert(error.reason);
          Session.set('editedTeamId', self._id);
          Tracker.afterFlush(function(){
            tpl.$('input[name=name]').val(teamName);
            tpl.$('input[name=name]').focus();
          });
        }
      });

      Session.set('editedTeamId', null);
    }
  },
 
  "click a.cancel": function(e, tpl){
    e.preventDefault();
    Session.set('editedTeamId', null);
  },
 
  'click a.remove': function(e, tpl){
    e.preventDefault();
    Teams.remove(this._id);
  }
});

