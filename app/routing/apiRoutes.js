var friends = require("../data/friends");

module.exports = function(app) {
  // resquests friends in friends.js
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function(req, res) {
    console.log(req.body.scores);

    // Gets user details (name, photo, scores)
    var user = req.body;

    // parseInt for scores
    for(var i = 0; i < user.scores.length; i++) {
      user.scores[i] = parseInt(user.scores[i]);
    }

    // default friend match is the first friend with closest score
    var bestMatch = 0;
    var minimumDifference = 40;

    // starts at 0 difference and compares the user and the friends scores
    for(var i = 0; i < friends.length; i++) {
      var totalDifference = 0;
      for(var j = 0; j < friends[i].scores.length; j++) {
        var difference = Math.abs(user.scores[j] - friends[i].scores[j]);
        totalDifference += difference;
      }

      // changes bestmatch to new match if minimum difference changes
      if(totalDifference < minimumDifference) {
        bestMatch = i;
        minimumDifference = totalDifference;
      }
    }

    // pushes new match to array
    friends.push(user);

    // send back to friend match
    res.json(friends[bestFriendIndex]);
  });
};
