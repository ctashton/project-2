module.exports = function (sequelize, DataTypes) {

    const user_favorites = sequelize.define("user_favorites", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        category: {
            type: DataTypes.STRING
        },
        alcoholic: {
            type: DataTypes.STRING
        },
        glass: {
            type: DataTypes.STRING
        },
        instructions: {
            type: DataTypes.STRING(1000)
        },
        pic: {
            type: DataTypes.STRING
        },
        ingredients: {
            type: DataTypes.STRING
        },
        measurements: {
            type: DataTypes.STRING
        }
    })

    user_favorites.associate = models => {
        user_favorites.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        })
    }

    return user_favorites
}