const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('reservation', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    reservation_uid: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: "reservation_reservation_uid_key"
    },
    username: {
      type: DataTypes.STRING(80),
      allowNull: false
    },
    book_uid: {
      type: DataTypes.UUID,
      allowNull: false
    },
    library_uid: {
      type: DataTypes.UUID,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    till_date: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'reservation',
    schema: 'reservation_system',
    timestamps: false,
    indexes: [
      {
        name: "reservation_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "reservation_reservation_uid_key",
        unique: true,
        fields: [
          { name: "reservation_uid" },
        ]
      },
    ]
  });
};
