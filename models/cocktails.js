// testing db cocktails to populate main page
// this does create a table at the moment

module.exports = function(sequelize, DataTypes) {
  var Cocktails = sequelize.define("Cocktails", {
    // eslint-disable-next-line camelcase
    name: DataTypes.STRING,
    category: DataTypes.STRING,
    glass: DataTypes.STRING,
    pic: DataTypes.STRING,
    instructions: DataTypes.STRING,
    ing: DataTypes.STRING,
    favorite: DataTypes.BOOLEAN
  });
  return Cocktails;
};
