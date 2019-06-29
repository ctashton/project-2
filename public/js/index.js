// Get references to custom drink elements
var $customName = $("#customName");
var $customPic = $("#customImgFile");
var $customCat = $("#customDrinkCat");
var $customGlass = $("#customGlass");
var $customInstructions = $("#customInstructions");
var $customIng = $("#customIng");
var $customSave = $("#customSave")

// Beginning of teams code
moment().format();
// log in / sign up
$("#login-form").on("submit", function () {
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
    .then(function (data) {
      $("#loginModal").toggle();
      $(".modal-backdrop").remove();
      location.reload()
    })
    .catch(function (err) {
      console.log(err);
    });
}

// post request for signup
function signupUser(email, password) {
  $.post("/api/signup", {
    email: email,
    password: password
  })
    .then(function (data) {
      $("#loginModal").toggle();
      $(".modal-backdrop").remove();
      location.reload()
    })
    .catch(function (err) {
      console.log(err);
    });
}

// log out
$(document).on("click", "#logout", function () {
  $.get("/logout").then(
    location.reload()
  );
});

// add a drink to favorites
$(document).on("click", "#fav-button", function () {

  $.post("/favorite", {
    name: $(this).attr('data-name'),
    category: $(this).attr('data-category'),
    alcoholic: $(this).attr('data-alcoholic'),
    glass: $(this).attr('data-glass'),
    instructions: $(this).attr('data-instructions'),
    pic: $(this).attr('data-pic'),
    ingredients: JSON.stringify($(this).attr('data-ingredients')),
    measurements: JSON.stringify($(this).attr('data-measurements'))

  }).then(data => {
    if (!data) $("#loginModal").modal("show")
    else console.log('favorite added')
  })
})

// search by ingredient and category do not return full results, so we must search by id
$(document).on("click", "#fav-button-extra", function () {
  let id = $(this).attr('data-id')

  $.post("/search", {
    method: "id",
    data: id
  }).then(data => {
    console.log('data: ' + JSON.stringify(data, null, 4))
    $.post("/favorite", {
      //data
      name: data.name,
      category: data.category,
      alcoholic: data.alcoholic,
      glass: data.glass,
      instructions: data.instructions,
      pic: data.pic,
      ingredients: JSON.stringify(data.ingredients),
      measurements: JSON.stringify(data.measurements)
    }).then(data => {
      if (!data) $("#loginModal").modal("show")
      else console.log('favorite added')
    })
  })
})

// search for drink by name
$("#name-search").on("click", function () {
  let drinkName = $('#drink-name').val().trim()

  $.post("/search", {
    method: "name",
    data: drinkName
  }).then(data => {
    console.log(data)
    $("#results").empty()
    data.forEach(item => {
      console.log('item: ' + item)
      let drinkResult = $(
        `
          <div id="result-card" class="card" style="width: 18rem;">
            <img class="card-img-top" src="${item.pic}">
            <div class="card-body">
              <h5 class="card-title text-center">${item.name}</h5>
              <p class="card-text"></p>
            </div>
          </div>
        `
        // <a data-id="${item.id}">${item.name}</a><br>
      )
      $('#results').append(drinkResult)
      let favButton = $(`<button id="fav-button" data-id="${item.id}" data-name="${item.name}" data-category="${item.category}" data-alcoholic="${item.alcoholic}" data-glass="${item.glass}" data-instructions="${item.instructions}" data-pic="${item.pic}" data-ingredients="${item.ingredients}" data-measurements="${item.measurements}" class="btn btn-warning"> &#9733;</button>`).appendTo(drinkResult)
    })
  })
})

// search by ingredient
$("#ing-search").on("click", function () {
  let ingName = $("#ing-name").val().trim()

  $.post("/search", {
    method: "ing",
    data: ingName
  }).then(data => {
    console.log(data)
    $("#results").empty()
    data.forEach(item => {
      let drinkResult = $(
        `
          <div id="result-card" class="card" style="width: 18rem;">
            <img class="card-img-top" src="${item.pic}">
            <div class="card-body">
              <h5 class="card-title text-center">${item.name}</h5>
              <p class="card-text"></p>
            </div>
          </div>
        `
        // `<a id="ing-result" data-id="${item.id}">${item.name}</a><br>`
      )
      $('#results').append(drinkResult)
      let favButton = $(`<button id="fav-button-extra" data-id="${item.id}" data-name="${item.name}" data-category="${item.category}" data-alcoholic="${item.alcoholic}" data-glass="${item.glass}" data-instructions="${item.instructions}" data-pic="${item.pic}" data-ingredients="${item.ingredients}" data-measurements="${item.measurements}" class="btn btn-warning"> &#9733;</button>`).appendTo(drinkResult)
    })
  })
})

// clicking a result will search by id and grab more data about that drink
$(document).on("click", "#ing-result", function () {
  let id = $(this).attr('data-id')

  $.post("/search", {
    method: "id",
    data: id
  }).then(data => {
    console.log(data)
  })
})

// search most popular
$("#most-pop").on("click", function () {
  $.post("/search", {
    method: "popular"
  }).then(data => {
    console.log(data)
    $("#results").empty()
    data.forEach(item => {
      let drinkResult = $(
        `
          <div id="result-card" class="card" style="width: 18rem;">
            <img class="card-img-top" src="${item.pic}">
            <div class="card-body">
              <h5 class="card-title text-center">${item.name}</h5>
              <p class="card-text"></p>
            </div>
          </div>
        `
        // `<a data-id="${item.id}">${item.name}</a><br>`
      )
      $('#results').append(drinkResult)
      let favButton = $(`<button id="fav-button" data-id="${item.id}" data-name="${item.name}" data-category="${item.category}" data-alcoholic="${item.alcoholic}" data-glass="${item.glass}" data-instructions="${item.instructions}" data-pic="${item.pic}" data-ingredients="${item.ingredients}" data-measurements="${item.measurements}" class="btn btn-warning"> &#9733;</button>`).appendTo(drinkResult)
    })
  })
})

// get a random drink
$("#random").on('click', function () {
  $.post("/search", {
    method: "random"
  }).then(data => {
    console.log(data)
    $("#results").empty()
    let drinkResult = $(
      `
        <div id="result-card" class="card" style="width: 18rem;">
          <img class="card-img-top" src="${data.pic}">
          <div class="card-body">
            <h5 class="card-title text-center">${data.name}</h5>
            <p class="card-text"></p>
          </div>
        </div>
      `
      // `<a data-id="${data.id}">${data.name}</a><br>`
    )
    $('#results').append(drinkResult)
    let favButton = $(`<button id="fav-button" data-id="${data.id}" data-name="${data.name}" data-category="${data.category}" data-alcoholic="${data.alcoholic}" data-glass="${data.glass}" data-instructions="${data.instructions}" data-pic="${data.pic}" data-ingredients="${data.ingredients}" data-measurements="${data.measurements}" class="btn btn-warning"> &#9733;</button>`).appendTo(drinkResult)
  })
})

// search by category
$("#cat-dropdown").on("change", function () {
  let val = $('#cat-dropdown :selected').text()

  $.post("/search", {
    method: "category",
    data: val
  }).then(data => {
    console.log(data)
    $("#results").empty()
    data.forEach(item => {
      let catResult = $(
        `
          <div id="result-card" class="card" style="width: 18rem;">
            <img class="card-img-top" src="${item.pic}">
            <div class="card-body">
              <h5 class="card-title text-center">${item.name}</h5>
              <p class="card-text"></p>
            </div>
          </div>
        `
        // `<a id="cat-result" data-id="${item.id}">${item.name}</a><br>`
      )
      $('#results').append(catResult)
      let favButton = $(`<button id="fav-button-extra" data-id="${item.id}" data-name="${item.name}" data-category="${item.category}" data-alcoholic="${item.alcoholic}" data-glass="${item.glass}" data-instructions="${item.instructions}" data-pic="${item.pic}" data-ingredients="${item.ingredients}" data-measurements="${item.measurements}" class="btn btn-warning"> &#9733;</button>`).appendTo(catResult)
    })
  })
})

$("#cat-search").on("click", function () {
  let val = $('#cat-dropdown-banner :selected').text()

  $.post("/search", {
    method: "category",
    data: val
  }).then(data => {
    console.log(data)
    $("#results").empty()
    data.forEach(item => {
      let catResult = $(
        `
          <div id="result-card" class="card" style="width: 18rem;">
            <img class="card-img-top" src="${item.pic}">
            <div class="card-body">
              <h5 class="card-title text-center">${item.name}</h5>
              <p class="card-text"></p>
            </div>
          </div>
        `
        // `<a id="cat-result" data-id="${item.id}">${item.name}</a><br>`
      )
      $('#results').append(catResult)
      let favButton = $(`<button id="fav-button-extra" data-id="${item.id}" data-name="${item.name}" data-category="${item.category}" data-alcoholic="${item.alcoholic}" data-glass="${item.glass}" data-instructions="${item.instructions}" data-pic="${item.pic}" data-ingredients="${item.ingredients}" data-measurements="${item.measurements}" class="btn btn-warning"> &#9733;</button>`).appendTo(catResult)
    })
  })
})

// clicking a result will search by id and grab more data about that drink
$(document).on("click", "#cheers", function() {
  let m = $('#monthInp').val().trim() 
  let d = $('#dateInp').val().trim() 
  let y = $('#yearInp').val().trim()
  let age = m+d+y
  console.log(age)
  let dif = moment( age , "MMDDYYYY").fromNow();
  console.log(dif)
    if (parseInt(dif)>=21){
      let url = "/index";
      $(location).attr('href',url)
      console.log("User passed 21");

    }
    else {
      let url = 'https://www.cdc.gov/alcohol/fact-sheets/minimum-legal-drinking-age.htm';
      $(location).attr('href',url)
      console.log("User is under 21");
    }
})

$(document).on("click", "#cat-result", function () {
  let id = $(this).attr('data-id')

  $.post("/search", {
    method: "id",
    data: id
  }).then(data => {
    console.log(data)
  })
})

// delete from favorites list
$(document).on("click", "#delete-fav", function() {
  let id = $(this).attr('data-id')
  $.ajax("/api/delete/" + id, {
    type: "DELETE"
  })
  .then(function(data) {
      console.log(`drink ${id} successfully deleted`)
      location.reload()
  })
})

  var chosenDrink;
// cocktail modal
$('.drink-card').click(function (event) {
    chosenDrink = {
    id: $(this).data("id"),
    pic: $(this).data("pic"),
    name: $(this).data("name"),
    category: $(this).data("category"),
    glass: $(this).data("glass"),
    instructions: $(this).data("instructions"),
    ingredients: $(this).data("ingredients")
  }
  
  $("#drinkId").attr("data-id", chosenDrink.id);
  $("#drinkTitle").html(chosenDrink.name);
  $("#drinkImage").attr("src", chosenDrink.pic);
  $('#drinkCategory').html("Category: " + chosenDrink.category);
  $('#drinkGlass').html("Glass: " + chosenDrink.glass);
  $('#drinkInstructions').html("Instructions: " + chosenDrink.instructions);
  $('#drinkIng').html("Ingredients: " + chosenDrink.ingredients);
  $('#modifyBtn').attr("data-id", chosenDrink.id)
                 .attr("data-pic", chosenDrink.pic)
                 .attr("data-name", chosenDrink.name)
                 .attr("data-category", chosenDrink.category)
                 .attr("data-glass", chosenDrink.glass)
                 .attr("data-instructions", chosenDrink.instructions)
                 .attr("data-ingredients", chosenDrink.ingredients);
  $('#cocktailModal').modal('show');
});

// on click function from Modal
$('#modifyBtn').click(function (event) {
  location.href = "/customize/" + chosenDrink.id;
  
  var makeCustomDrink = {
    newId: $(this).data("id"),
    pic: $(this).data("pic"),
    name: $(this).data("name"),
    category: $(this).data("category"),
    glass: $(this).data("glass"),
    instructions: $(this).data("instructions"),
    ingredients: $(this).data("ingredients")
  };
  console.log(makeCustomDrink);
  
  // Send the POST request.
  // $.ajax("/customize", {
  //   type: "POST",
  //   data: makeCustomDrink
  // }).then(
  //   function() {
  //     console.log("created new drink!");
  //     // Reload the page to get the updated list
  //     location.reload();
  //   }
  // );
});


// star for favorites
$(".star").click(function () {
  $(this).toggleClass("far fa-star fas fa-star");
});

// Multi-Search
function search(data) {
  if (event.keyCode == 13) {
    $("#results").empty()
    let ingName = data.value

    $.post("/search", {
      method: "ing",
      data: ingName
    }).then(data => {
      console.log(data)
      data.forEach(item => {
        let drinkResult = $(
          `
            <div id="result-card" class="card" style="width: 18rem;">
              <img class="card-img-top" src="${item.pic}">
              <div class="card-body">
                <h5 class="card-title text-center">${item.name}</h5>
                <p class="card-text"></p>
              </div>
            </div>
          `
          // `<a id="ing-result" data-id="${item.id}">${item.name}</a><br>`
        )
        $('#results').append(drinkResult)
        let favButton = $(`<button id="fav-button-extra" data-id="${item.id}" data-name="${item.name}" data-category="${item.category}" data-alcoholic="${item.alcoholic}" data-glass="${item.glass}" data-instructions="${item.instructions}" data-pic="${item.pic}" data-ingredients="${item.ingredients}" data-measurements="${item.measurements}" class="btn btn-warning"> &#9733;</button>`).appendTo(drinkResult)
      })
    })
    let drinkName = data.value

    $.post("/search", {
      method: "name",
      data: drinkName
    }).then(data => {
      console.log(data)
      data.forEach(item => {
        let drinkResult = $(
          `
            <div id="result-card" class="card" style="width: 18rem;">
              <img class="card-img-top" src="${item.pic}">
              <div class="card-body">
                <h5 class="card-title text-center">${item.name}</h5>
                <p class="card-text"></p>
              </div>
            </div>
          `
          // `<a data-id="${item.id}">${item.name}</a><br>`
        )
        $('#results').prepend(drinkResult)
        let favButton = $(`<button id="fav-button" data-id="${item.id}" data-name="${item.name}" data-category="${item.category}" data-alcoholic="${item.alcoholic}" data-glass="${item.glass}" data-instructions="${item.instructions}" data-pic="${item.pic}" data-ingredients="${item.ingredients}" data-measurements="${item.measurements}" class="btn btn-warning"> &#9733;</button>`).appendTo(drinkResult)
      })
    })
    
  }
}

// ***** boilerplate code ***** 




// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveCustomDrink: function (customDrink) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/custom_drink",
      data: JSON.stringify(customDrink)
    });
  },
  getCustomDrink: function () {
    return $.ajax({
      url: "api/custom_drink",
      type: "GET"
    });
  },
  deleteCustomDrink: function (id) {
    return $.ajax({
      url: "api/custom_drink/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshCustomDrinks = function () {
  API.getCustomDrink().then(function (data) {
    var $customDrink = data.map(function (customDrink) {
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

// handleFormSubmit is called whenever we submit a new custom drink
// Save the new custom drink to the db and refresh the users custom drinks
var handleFormSubmit = function (event) {
  event.preventDefault();

  var customDrink = {
    name: $customName.val().trim(),
    category: $customCat.val().trim(),
    glass: $customGlass.val().trim(),
    instructions: $customInstructions.val().trim(),
    pic: $customPic.val().trim(),
    ingredients: $customIng.val().trim()
  };
  console.log(customDrink);

  if (!(customDrink.name && customDrink.category && customDrink.instructions)) {
    alert("You must enter a name, category, and instructions!");
    return;
  }

  API.saveCustomDrink(customDrink).then(function () {
    refreshCustomDrinks();
  });

  $customName.val("");
  $customCat.val("");
  $customGlass.val("");
  $customInstructions.val("");
  $customPic.val("");
  $customIng.val("")
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function () {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function () {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$customSave.on("click", handleFormSubmit);
// $exampleList.on("click", ".delete", handleDeleteBtnClick);