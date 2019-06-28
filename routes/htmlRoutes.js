var db = require("../models");
var path = require("path");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    // req.user will determine if user is logged in
    res.render("index", {user: req.user})
  });

  app.get("/profile", function(req, res) {
    // get user favorites from database
    if (req.user) {
      let favs = []

      db.user_favorites.findAll({
        where: {
          UserId: req.user.id
        }
      })
      .then(data => {
        data.forEach(item => {
          //item.dataValues contains all drink data
          console.log(item.dataValues)
          favs.push(item.dataValues)
        })

        // render profile page with favorites
        res.render("profile", { favorites: favs })
      })
    }
  })


  
  // ***** boilerplate code ***** 


  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
