const axios = require('axios')

module.exports = {

    searchByName: function (drinkName) {
        return new Promise((resolve, reject) => {

            let query = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkName}`

            axios.get(query).then(response => {

                let data = response.data.drinks
                let drinks = []

                data.forEach(item => {
                    let drink = {
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


    searchByIng: function(ingName) {
        return new Promise((resolve, reject) => {

            let query = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingName}`

            axios.get(query).then(response => {
                console.log(response.data)

                let drinks = []
                response.data.drinks.forEach(item => {
                    console.log(`${item.strDrink}\n`)
                    drinks.push(item.strDrink)
                })

                resolve(drinks)
            })
            .catch(err => console.log(err))
        })
    },


    // searchByIng will return an id that we will use to search for full drink details
    searchByID: function(id) {

    },
}