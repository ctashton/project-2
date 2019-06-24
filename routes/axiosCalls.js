const axios = require('axios')

module.exports = {

    searchByName: function(drinkName) {
        let query = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkName}`

        axios.get(query).then( response => {
            console.log(response.data.drinks[0])
            let data = response.data.drinks[0]
            let drink = {
                name: data.strDrink,
                category: data.strCategory,
                alcoholic: data.strAlcoholic,
                glass: data.strGlass,
                instructions: data.strInstructions,
                pic: data.strDrinkThumb,
                ingredients: [],
                measurements: []
            }

            for (let i = 1; i < 15; i++) {
                if (data[`strIngredient${i}`]) {
                    console.log(`ing ${i}: ` + data[`strIngredient${i}`])
                    drink.ingredients.push(data[`strIngredient${i}`])

                    if (data[`strMeasure${i}`]) {
                        console.log(`measurement ${i}: ` + data[`strMeasure${i}`])
                        drink.measurements.push(data[`strMeasure${i}`])
                    }
                }
            }
        })
        .catch(err => console.log(err))
    }
}