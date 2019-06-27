const axios = require('axios')
require('dotenv').config()

let key = process.env.COCKTAIL_KEY  

module.exports = {

    // search by name of drink
    searchByName: function (drinkName) {
        return new Promise((resolve, reject) => {

            let query = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkName}`

            axios.get(query).then(response => {

                let data = response.data.drinks
                let drinks = []

                data.forEach(item => {
                    let drink = {
                        id: item.idDrink,
                        name: item.strDrink,
                        category: item.strCategory,
                        alcoholic: item.strAlcoholic,
                        glass: item.strGlass,
                        instructions: item.strInstructions,
                        pic: item.strDrinkThumb,
                        ingredients: [],
                        measurements: []
                    }

                    for (let i = 1; i <= 15; i++) {
                        if (item[`strIngredient${i}`]) {
                            drink.ingredients.push(item[`strIngredient${i}`])

                            if (item[`strMeasure${i}`]) {
                                drink.measurements.push(item[`strMeasure${i}`])
                            }
                        }
                    }

                    drinks.push(drink)
                })

                resolve(drinks)
            })
            .catch(err => console.log(err))
        })
    },


    // search by drink ingredients
    searchByIng: function(ingName) {
        return new Promise((resolve, reject) => {

            let query = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingName}`

            axios.get(query).then(response => {

                let drinks = []
                response.data.drinks.forEach(item => {
                    let drink = {
                        name: item.strDrink,
                        id: item.idDrink,
                        pic: item.strDrinkThumb
                    }
                    drinks.push(drink)
                })

                resolve(drinks)
            })
            .catch(err => console.log(err))
        })
    },
    
    
    // searchByIng will return an id that we will use to search for full drink details
    searchByID: function (id) {
        return new Promise((resolve, reject) => {

            let query = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`

            axios.get(query).then(response => {

                let data = response.data.drinks[0]
                let drink = {
                    id: data.idDrink,
                    name: data.strDrink,
                    category: data.strCategory,
                    alcoholic: data.strAlcoholic,
                    glass: data.strGlass,
                    instructions: data.strInstructions,
                    pic: data.strDrinkThumb,
                    ingredients: [],
                    measurements: []
                }

                for (let i = 1; i <= 15; i++) {
                    if (data[`strIngredient${i}`]) {
                        drink.ingredients.push(data[`strIngredient${i}`])

                        if (data[`strMeasure${i}`]) {
                            drink.measurements.push(data[`strMeasure${i}`])
                        }
                    }
                }

                resolve(drink)
            })
            .catch(err => console.log(err))
        })
    },


    // returns the most popular cocktails
    mostPopular: function() {
        return new Promise((resolve, reject) => {

            let query = `https://www.thecocktaildb.com/api/json/v2/${key}/popular.php`

            axios.get(query).then(response => {

                let data = response.data.drinks
                let drinks = []

                data.forEach(item => {
                    let drink = {
                        id: item.idDrink,
                        name: item.strDrink,
                        category: item.strCategory,
                        alcoholic: item.strAlcoholic,
                        glass: item.strGlass,
                        instructions: item.strInstructions,
                        pic: item.strDrinkThumb,
                        ingredients: [],
                        measurements: []
                    }

                    for (let i = 1; i <= 15; i++) {
                        if (item[`strIngredient${i}`]) {
                            drink.ingredients.push(item[`strIngredient${i}`])

                            if (item[`strMeasure${i}`]) {
                                drink.measurements.push(item[`strMeasure${i}`])
                            }
                        }
                    }

                    drinks.push(drink)
                })

                resolve(drinks)
            })
        })
    },


    getRandom: function() {
        return new Promise((resolve, reject) => {

            let query = `https://www.thecocktaildb.com/api/json/v1/1/random.php`

            axios.get(query).then(response => {

                let data = response.data.drinks[0]
                let drink = {
                    id: data.idDrink,
                    name: data.strDrink,
                    category: data.strCategory,
                    alcoholic: data.strAlcoholic,
                    glass: data.strGlass,
                    instructions: data.strInstructions,
                    pic: data.strDrinkThumb,
                    ingredients: [],
                    measurements: []
                }

                for (let i = 1; i <= 15; i++) {
                    if (data[`strIngredient${i}`]) {
                        drink.ingredients.push(data[`strIngredient${i}`])

                        if (data[`strMeasure${i}`]) {
                            drink.measurements.push(data[`strMeasure${i}`])
                        }
                    }
                }

                resolve(drink)
            })
        })
    },


    searchByCat: function(cat) {
        return new Promise((resolve, reject) => {

            let query = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${cat}`

            axios.get(query).then(response => {

                let drinks = []
                response.data.drinks.forEach(item => {
                    let drink = {
                        name: item.strDrink,
                        id: item.idDrink,
                        pic: item.strDrinkThumb
                    }
                    drinks.push(drink)
                })

                resolve(drinks)
            })
        })
    }
}