var db = require("../models");
var path = require("path");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    // req.user will determine if user is logged in
    // res.render("splash", {user: req.user})
    res.render('splash', { user: req.user })
  });

  // Load index page pull from db to populate 
  // Main page display
  app.get("/index", function(req, res) {
    db.Cocktails.findAll({}).then(function(dbCocktails) {
      res.render("index",{
        user: req.user,
        msg: "Popular Cocktails!",
        cocktails: dbCocktails
      });
    });
  });
  app.get("/splash", function(req, res){
    res.render("splash", {
      user: req.user,
    })
  })
  
  // profile page
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
          let dv = item.dataValues

          // remove quotes and brackets from string
          dv.ingredients = (dv.ingredients.replace(/[\[\]"]+/g,'')).split(',')
          dv.measurements = (dv.measurements.replace(/[\[\]"]+/g,'')).split(',')

          // combine ingredients and measurements into one array
          dv.ingr = []
          for (let i = 0; i < dv.ingredients.length; i++) {
            dv.ingr.push(dv.ingredients[i] + ' ' + dv.measurements[i])
          }

          //item.dataValues contains all drink data
          favs.push(item.dataValues)
              // get user custom made drinks from database
            // let custom = []
      
            // db.Custom_drinks.findAll({
            //   where: {
            //     UserId: req.user.id
            //   }
            // })
            // .then(data => {
            //   data.forEach(item => {
            //     let cv = item.dataValues

            //     // remove quotes and brackets from string
            //     // cv.ingredients = (cv.ingredients.replace(/[\[\]"]+/g,'')).split(',')
            //     // cv.measurements = (cv.measurements.replace(/[\[\]"]+/g,'')).split(',')

            //     // combine ingredients and measurements into one array
            //     // cv.ingr = []
            //     // for (let i = 0; i < cv.ingredients.length; i++) {
            //     //   cv.ingr.push(cv.ingredients[i] + ' ' + cv.measurements[i])
            //     // }

            //     //item.dataValues contains all drink data
            //     custom.push(item.dataValues)
            //   })

          // render profile page with favorites and custom drinks
          res.render("profile", { 
            favorites: favs,
            // custom: custom
          })
        })
      })
    // })
  }
})

// populate custom drink form to custumize user drinks
  app.get("/customize/:id", function(req, res) {
    db.Cocktails.findOne({ where: { id: req.params.id } }).then(function(
      dbCocktails
    ) {
      res.render("customize", {
        cc : dbCocktails 
      });
    });
  });

  // currently unused
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
