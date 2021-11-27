const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('library', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    library_uid: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: "library_library_uid_key"
    },
    name: {
      type: DataTypes.STRING(80),
      allowNull: false
    },
    city: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'library',
    schema: 'library_system',
    timestamps: false,
    indexes: [
      {
        name: "library_library_uid_key",
        unique: true,
        fields: [
          { name: "library_uid" },
        ]
      },
      {
        name: "library_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
