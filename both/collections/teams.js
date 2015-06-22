Teams = new Meteor.Collection('teams');

Teams.allow({
  insert: function (userId, doc) {
    return (userId && doc.ownerId === userId);
  },
  update: function (userId, doc, fields, modifier) {
    return doc.ownerId === userId;
  },
  remove: function (userId, doc) {
    return doc.ownerId === userId;
  },
  fetch: ['ownerId']
});

Meteor.methods({
  teamUpdate: function(teamId, newName){
    check(Meteor.userId(), String);
    check(teamId, String);
    check(newName, String);

    var team = Teams.findOne(teamId);
    if(team){
      Teams.update(teamId, {$set: {name: newName}}, function(error){
        if(!error){
          if(team.gameIds){
            var games = Games.find({_id: {$in: team.gameIds}});
       
            games.fetch().forEach(function(game){
              game.teams.map(function(team){
                if(team._id == teamId){
                  team.name = newName;
                }

                Games.update({_id: game._id}, {$set: {teams: game.teams}});
              })
            });
          }

          return teamId;
        }
      });
    } else {
      throw new Meteor.Error("team-does-not-exist", "This team doesn't exist in the database");
    };
  }
});
