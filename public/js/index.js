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

// get more info about a drink
$(document).on("click", "#more-info", function() {

  let name = $(this).siblings("#fav-button").attr("data-name")
  let category = $(this).siblings("#fav-button").attr("data-category")
  let alcoholic = $(this).siblings("#fav-button").attr("data-alcoholic")
  let glass = $(this).siblings("#fav-button").attr("data-glass")
  let instructions = $(this).siblings("#fav-button").attr("data-instructions")
  let ingredients = ($(this).siblings("#fav-button").attr("data-ingredients")).split(',')
  let measurements = ($(this).siblings("#fav-button").attr("data-measurements")).split(',')

  $("#info-name").html(`<strong>${name}</strong>`)
  $("#info-category").html(`<strong>Category: </strong>${category}`)
  $("#info-alcoholic").html(`<strong>Alcohol Content: </strong>${alcoholic}`)
  $("#info-glass").html(`<strong>Glass: </strong>${glass}`)
  $("#info-instructions").html(`<strong>Instructions: </strong>${instructions}`)

  // format ingredients and measurements
  $("#info-ingredients").html(`<strong>Ingredients: </strong>`)
  for (let i = 0; i < ingredients.length; i++) {
    document.getElementById('info-ingredients').innerHTML += `<br>${ingredients[i]}: ${measurements[i]}`
  }

  $("#moreInfoModal").modal("show")
})

$(document).on("click", "#more-info-extra", function() {
  let id = $(this).siblings("#fav-button-extra").attr("data-id")

  $.post("/search", {
    method: "id",
    data: id
  })
  .then(data => {
    let name = data.name
    let category = data.category
    let alcoholic = data.alcoholic
    let glass = data.glass
    let instructions = data.instructions
    let ingredients = data.ingredients
    let measurements = data.measurements

    $("#info-name").html(`<strong>${name}</strong>`)
    $("#info-category").html(`<strong>Category: </strong>${category}`)
    $("#info-alcoholic").html(`<strong>Alcohol Content: </strong>${alcoholic}`)
    $("#info-glass").html(`<strong>Glass: </strong>${glass}`)
    $("#info-instructions").html(`<strong>Instructions: </strong>${instructions}`)
    
    // format ingredients and measurements
    $("#info-ingredients").html(`<strong>Ingredients: </strong>`)
    for (let i = 0; i < ingredients.length; i++) {
      document.getElementById('info-ingredients').innerHTML += `<br>${ingredients[i]}: ${measurements[i]}`
    }

    $("#moreInfoModal").modal("show")
  })
})

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
      let moreInfo = $(`<button id="more-info" class="btn btn-primary">More Info</button>`).appendTo(drinkResult)
      let favButton = $(`<button id="fav-button" data-id="${item.id}" data-name="${item.name}" data-category="${item.category}" data-alcoholic="${item.alcoholic}" data-glass="${item.glass}" data-instructions="${item.instructions}" data-pic="${item.pic}" data-ingredients="${item.ingredients}" data-measurements="${item.measurements}" class="btn btn-warning"> &#9733;</button>`).appendTo(drinkResult)
    })
  })
})

// search by name on enter
$("#drink-name").keyup(function(event) {
  if (event.key === "Enter") {
    $("#name-search").click()
  }
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
      )
      $('#results').append(drinkResult)
      let moreInfo = $(`<button id="more-info-extra" class="btn btn-primary">More Info</button>`).appendTo(drinkResult)
      let favButton = $(`<button id="fav-button-extra" data-id="${item.id}" data-name="${item.name}" data-category="${item.category}" data-alcoholic="${item.alcoholic}" data-glass="${item.glass}" data-instructions="${item.instructions}" data-pic="${item.pic}" data-ingredients="${item.ingredients}" data-measurements="${item.measurements}" class="btn btn-warning"> &#9733;</button>`).appendTo(drinkResult)
    })
  })
})

// search by ingredient on enter
$("#ing-name").keyup(function(event) {
  if (event.key === "Enter") {
    $("#ing-search").click()
  }
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
      )
      $('#results').append(drinkResult)
      let moreInfo = $(`<button id="more-info" class="btn btn-primary">More Info</button>`).appendTo(drinkResult)
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
    )
    $('#results').append(drinkResult)
    let moreInfo = $(`<button id="more-info" class="btn btn-primary">More Info</button>`).appendTo(drinkResult)
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
      )
      $('#results').append(catResult)
      let moreInfo = $(`<button id="more-info-extra" class="btn btn-primary">More Info</button>`).appendTo(catResult)
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
      )
      $('#results').append(catResult)
      let moreInfo = $(`<button id="more-info-extra" class="btn btn-primary">More Info</button>`).appendTo(catResult)
      let favButton = $(`<button id="fav-button-extra" data-id="${item.id}" data-name="${item.name}" data-category="${item.category}" data-alcoholic="${item.alcoholic}" data-glass="${item.glass}" data-instructions="${item.instructions}" data-pic="${item.pic}" data-ingredients="${item.ingredients}" data-measurements="${item.measurements}" class="btn btn-warning"> &#9733;</button>`).appendTo(catResult)
    })
  })
})

// clicking a result will search by id and grab more data about that drink
$(document).on("click", "#cheers", function() {
  let m = $('#monthInp').val().trim().toString()
  let d = $('#dateInp').val().trim().toString()
  let y = $('#yearInp').val().trim().toString()
  let age = m+d+y
  console.log(age)
  let dif = moment( age , "MMDDYYYY").fromNow();
  console.log(dif)
    if (parseFloat(dif)>=21){
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

var makeCustomDrink;
// on click function from Modal
$('#modifyBtn').click(function (event) {
  location.href = "/customize/" + chosenDrink.id;
  
  makeCustomDrink = {
    newId: $(this).data("id"),
    pic: $(this).data("pic"),
    name: $(this).data("name"),
    category: $(this).data("category"),
    alcoholic: $(this).data("alcoholic"),
    glass: $(this).data("glass"),
    instructions: $(this).data("instructions"),
    ingredients: $(this).data("ingredients")
  };
  console.log(makeCustomDrink);
});

$(document).on("click", "#customSave", function () {
  
  var userInput = {
      name: $("#customName").val().trim(),
      category: $("#customDrinkCat :selected").text(),
      alcoholic: $("#customAlc :selected").text(),
      glass: $("#customGlass :selected").text(),
      instructions: $("#customInstructions").val().trim(),
      pic: $("#customImgUrl").val().trim(),
      ingredients: [],
      measurements: []
  }
 
  $.each($(".customIng"), function() {
    console.log($(this).val().trim());
    userInput.ingredients.push($(this).val().trim())
  })
  $.each($(".customMeas"), function() {
    console.log($(this).val().trim())
    userInput.measurements.push($(this).val().trim())
  })
  if (!(userInput.name)) {
        alert("You must enter a name!");
        return;
      }
  console.log("userInput: " + JSON.stringify(userInput))                  
  userInput.ingredients = JSON.stringify(userInput.ingredients)
  userInput.measurements = JSON.stringify(userInput.measurements)
  $.post("/custom_drinks", userInput).then(data => {
    console.log("Data: " + JSON.stringify(data))
    // if (!data) $("#loginModal").modal("show")
    console.log('custom added')
  })
})
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
        )
        $('#results').append(drinkResult)
        let moreInfo = $(`<button id="more-info-extra" class="btn btn-primary">More Info</button>`).appendTo(drinkResult)
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
        )
        $('#results').prepend(drinkResult)
        let moreInfo = $(`<button id="more-info" class="btn btn-primary">More Info</button>`).appendTo(drinkResult)
        let favButton = $(`<button id="fav-button" data-id="${item.id}" data-name="${item.name}" data-category="${item.category}" data-alcoholic="${item.alcoholic}" data-glass="${item.glass}" data-instructions="${item.instructions}" data-pic="${item.pic}" data-ingredients="${item.ingredients}" data-measurements="${item.measurements}" class="btn btn-warning"> &#9733;</button>`).appendTo(drinkResult)
      })
    })
    
  }
}

