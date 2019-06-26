var db = require("../models");
var passport = require("../config/passport");
var moment = require('moment');

module.exports = function(app) {

  /*// Get all examples
  app.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.json(dbExample);
    });
  });
};*/

  app.get("/", function(req,res){ // "age" is the input from age page.
    let age = req.body.age;       // format is MMDDYYYY, for exp: 07101990
                            
    let dif = moment( age , "MMDDYYY").fromNow();
    if (parseInt(dif)>=21){
      res.redirect('/index');
      console.log("User passed 21");
    }
    else {
      res.redirect('https://www.cdc.gov/alcohol/fact-sheets/minimum-legal-drinking-age.htm');
      console.log("User is under 21");
    }
  });

  app.get("/api/api_cocktail", function(req, res) { // bottom api show button
    db.Custom_drink.findAll({}).then(function(db) {
      res.json(db);
    });
  });

  // user login
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.redirect('/index')

    // if (req.user) {
    //   res.send("logged in");
    // }
    console.log("login successful");
  });
   
  // user signup
  app.post("/api/signup", function(req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(function() {
        res.redirect('/')
        console.log("signup successful");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  // log out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
    console.log("logout successful");
  });
};