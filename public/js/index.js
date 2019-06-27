//  Boiler Plate
// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");

// Beginning of teams code

// log in / sign up
$("#login-form").on("submit", function() {
  event.preventDefault();

  // get user data from form
  let userData = {
    email: $("#email-input").val().trim(),
    password: $("#password-input").val().trim()
  };

  // check if user is logging in or signing up
  let method = document.activeElement.getAttribute("id");
  if (method === "login") {
    loginUser(userData.email, userData.password);
  }
  if (method === "signup") {
    signupUser(userData.email, userData.password);
  }

  // clear input fields
  $("#email-input").val("");
  $("#password-input").val("");
});

// post request for login
function loginUser(email, password) {
  $.post("/api/login", {
    email: email,
    password: password
  })
    .then(function(data) {
      $("#loginModal").toggle();
      $(".modal-backdrop").remove();
      location.reload()
    })
    .catch(function(err) {
      console.log(err);
    });
}

// post request for signup
function signupUser(email, password) {
  $.post("/api/signup", {
    email: email,
    password: password
  })
    .then(function(data) {
      $("#loginModal").toggle();
      $(".modal-backdrop").remove();
      location.reload()
    })
    .catch(function(err) {
      console.log(err);
    });
}

// log out
$(document).on("click", "#logout", function() {
  $.get("/logout").then(
    location.reload()
  );
});

$("#test").on("click", function() {
  $.post("/test").then(data => {
    console.log(data)
    if (!data) $("#loginModal").modal("show")
  })
})

// add a drink to favorites
$(document).on("click", "#fav-button", function() {

  $.post("/favorite", {
    name: $(this).attr('data-name'),
    category: $(this).attr('data-category'),
    alcoholic: $(this).attr('data-alcoholic'),
    glass: $(this).attr('data-glass'),
    instructions: $(this).attr('data-instructions'),
    pic: $(this).attr('data-pic'),
    ingredients: $(this).attr('data-ingredients'),
    measurements: $(this).attr('data-measurements')

  }).then(data => {
    if (!data) $("#loginModal").modal("show")
    else console.log('favorite added')
  })
})

// search for drink by name
$("#name-search").on("click", function() {
  let drinkName = $('#drink-name').val().trim()

  $.post("/search", {
    method: "name",
    data: drinkName
  }).then( data => {
    console.log(data)
    $("#results").empty()
    data.forEach(item => {
      let drinkResult = $(`<a data-id="${item.id}">${item.name}</a><br>`)
      $('#results').append(drinkResult)
      let favButton = $(`<button id="fav-button" data-id="${item.id}" data-name="${item.name}" data-category="${item.category}" data-alcoholic="${item.alcoholic}" data-glass="${item.glass}" data-instructions="${item.instructions}" data-pic="${item.pic}" data-ingredients="${item.ingredients}" data-measurements="${item.measurements}" class="btn btn-warning"> &#9733;</button>`).appendTo(drinkResult)
    })
  })
})

// search by ingredient
$("#ing-search").on("click", function() {
  let ingName = $("#ing-name").val().trim()

  $.post("/search", {
    method: "ing",
    data: ingName
  }).then( data => {
    console.log(data)
    $("#results").empty()
    data.forEach(item => {
      let drinkResult = $(`<a id="ing-result" data-id="${item.id}">${item.name}</a><br>`)
      $('#results').append(drinkResult)
      let favButton = $(`<button id="fav-button" data-id="${item.id}" class="btn btn-warning"> &#9733;</button>`).appendTo(drinkResult)
    })
  })
})

// clicking a result will search by id and grab more data about that drink
$(document).on("click", "#ing-result", function() {
  let id = $(this).attr('data-id')

  $.post("/search", {
    method: "id",
    data: id
  }).then( data => {
    console.log(data)
  })
})

// search most popular
$("#most-pop").on("click", function() {
  $.post("/search", {
    method: "popular"
  }).then(data => {
    console.log(data)
    $("#results").empty()
    data.forEach(item => {
      let drinkResult = $(`<a data-id="${item.id}">${item.name}</a><br>`)
      $('#results').append(drinkResult)
      let favButton = $(`<button id="fav-button" data-id="${item.id}" class="btn btn-warning"> &#9733;</button>`).appendTo(drinkResult)
    })
  })
})

// get a random drink
$("#random").on('click', function() {
  $.post("/search", {
    method: "random"
  }).then(data => {
    console.log(data)
    $("#results").empty()
    let drinkResult = $(`<a data-id="${data.id}">${data.name}</a><br>`)
    $('#results').append(drinkResult)
    let favButton = $(`<button id="fav-button" data-id="${data.id}" class="btn btn-warning"> &#9733;</button>`).appendTo(drinkResult)
  })
})

// search by category
$("#cat-search").on("click", function() {
  let val = $('#cat-dropdown :selected').text()

  $.post("/search", {
    method: "category",
    data: val
  }).then(data => {
    console.log(data)
    $("#results").empty()
    data.forEach(item => {
      let catResult = $(`<a id="cat-result" data-id="${item.id}">${item.name}</a><br>`)
      $('#results').append(catResult)
      let favButton = $(`<button id="fav-button" data-id="${item.id}" class="btn btn-warning"> &#9733;</button>`).appendTo(catResult)
    })
  })
})

// clicking a result will search by id and grab more data about that drink
$(document).on("click", "#cat-result", function() {
  let id = $(this).attr('data-id')

  $.post("/search", {
    method: "id",
    data: id
  }).then( data => {
    console.log(data)
  })
})

// main page display
// ajax call to populate main page display from api

// cocktail modal
$('.drink-card').click(function (event) {
  var id = $(this).data("id");
  var pic = $(this).data("pic");
  var name = $(this).data("name");
  var category = $(this).data("category");
  var glass = $(this).data("glass");
  var instructions = $(this).data("instructions");
  var ingredients = $(this).data("ingredients");
  
  $("#drinkTitle").html(name);
  $("#drinkImage").attr("src", pic);
  $('#drinkCategory').html("Category: " + category);
  $('#drinkGlass').html("Glass: " + glass);
  $('#drinkInstructions').html("Instructions: " + instructions);
  $('#drinkIng').html("Ingredients: " + ingredients);
  $('#cocktailModal').modal('show');
});

// star for favorites
$(".star").click(function() {
  $(this).toggleClass("far fa-star fas fa-star");
});


// ***** boilerplate code ***** 




// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
  API.getExamples().then(function(data) {
    var $examples = data.map(function(example) {
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var example = {
    text: $exampleText.val().trim(),
    description: $exampleDescription.val().trim()
  };

  if (!(example.text && example.description)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveExample(example).then(function() {
    refreshExamples();
  });

  $exampleText.val("");
  $exampleDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);
