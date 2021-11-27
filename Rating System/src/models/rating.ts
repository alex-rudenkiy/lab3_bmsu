const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('rating', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(80),
      allowNull: false
    },
    stars: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'rating',
    schema: 'rating_system',
    timestamps: false,
    indexes: [
      {
        name: "rating_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
