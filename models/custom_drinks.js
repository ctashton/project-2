module.exports = function(sequelize, DataTypes) {
  var Custom_drinks = sequelize.define("Custom_drinks", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3]
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3]
      }
    },
    alcoholic: {
      type: DataTypes.STRING
    },
    glass: {
      type: DataTypes.STRING,
      validate: {
        len: [3]
      }
    },
    instructions: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    picture: {
      type: DataTypes.STRING,
      defaultValue: "https://images.cdn4.stockunlimited.net/clipart/can-drink-cartoon-waving_1424382.jpg"
    },
    ingredient: {
      type: DataTypes.STRING,
      validate: {
        len: [10]
      }
    },
    measurements: {
      type: DataTypes.STRING,
      validate: {
        len: [10]
      }
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