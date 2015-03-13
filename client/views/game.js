Template.game.events({
  "click a.finish-game": function(e, tpl){
    e.preventDefault();
    Games.update({_id: this._id}, {$set: {completed: true}});
  },
 
  "click a.delete-game": function(e, tpl){
    e.preventDefault();
    var self = this;
    Games.remove(this._id, function(error){
      if(typeof error === "undefined" || error === null){
        var teams = Teams.find({gameIds: {$in: [self._id]}});
        _(teams.fetch()).each(function(team){
          Teams.update({_id: team._id}, {$pull: {gameIds: self._id}});
        });
      }
    });
  },
 
  "click a.score": function(e, tpl){
    e.preventDefault();
    var data = $(e.currentTarget).data();
    var update = {$inc: {}};
    var selector = "teams." + data.index + ".score";
    update.$inc[selector] = data.inc;
    Games.update({_id: this._id}, update);
  }
});
