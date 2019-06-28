var db = require("../models");
var path = require("path");

module.exports = function(app) {
  // Load index page
  // app.get("/", function(req, res) {
  //   // req.user will determine if user is logged in
  //   res.render("index", {user: req.user})
  // });

  // Load index page pull from db to populate 
  // Main page display
  app.get("/", function(req, res) {
    db.Cocktails.findAll({}).then(function(dbCocktails) {
      res.render("index",{
        msg: "Popular Cocktails!",
        cocktails: dbCocktails
      });
    });
  });

  // A GET Route to /customize which should display the custom drink page.

  // Need route that populates users custom drinks to their profile

  // Need route that populates users favorite drinks to profile

  // ***** boilerplate code ***** 

  // loads cocktails page  by id
  app.get("/cocktails/:id", function(req, res) {
    db.Cocktails.findOne({ where: { id: req.params.id } }).then(function(
      dbCocktails
    ) {
      res.render("cocktails", {
        cocktails: dbCocktails
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
