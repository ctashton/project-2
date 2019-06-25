var db = require("../models");
var passport = require("../config/passport");
let axios = require("./axiosCalls.js")

module.exports = function(app) {
  // user login
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.redirect('/')

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

  // search drinks by name or ingredient
  app.post("/search", function(req, res) {
    if (req.body.method === "name") {
      axios.searchByName(req.body.data)
        .then(data => res.json(data))

    } else if (req.body.method === "ing") {
      axios.searchByIng(req.body.data)
        .then(data => res.json(data))

    } else if (req.body.method === "id") {
      axios.searchByID(req.body.data)
        .then(data => res.json(data))

    } else if (req.body.method === "popular") {
      axios.mostPopular()
        .then(data => res.json(data))

    } else if (req.body.method === "random") {
      axios.getRandom()
        .then(data => res.json(data))

    } else if (req.body.method === "category") {
      axios.searchByCat(req.body.data)
        .then(data => res.json(data))
    }
  })

  // Get all examples
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
};
