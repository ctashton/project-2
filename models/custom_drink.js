module.exports = function(sequelize, DataTypes) {
    var Custom_drink = sequelize.define("Custom_drink", {
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
    });
    return Custom_drink;
  };