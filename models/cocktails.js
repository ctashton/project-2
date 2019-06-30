// main display table
module.exports = function(sequelize, DataTypes) {
  var Cocktails = sequelize.define("Cocktails", {
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
        type: DataTypes.STRING(1000)
    }
  });
  return Cocktails;
};
