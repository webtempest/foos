Meteor.startup(function () {
  if (Teams.find().count() === 0) {
    [
      {name: "Barcelona"},
      {name: "Real Madrid"},
      {name: "Matt's team"}
    ].forEach(function(team){
      Teams.insert(team);
    })
  }
});
