module.exports = function(sequelize, DataTypes) {
  var Custom_drinks = sequelize.define("Custom_drinks", {
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
  Custom_drinks.associate = models => {
    Custom_drinks.belongsTo(models.User, {
        foreignKey: {
            allowNull: false
        }
    })
}
  return Custom_drinks;
};