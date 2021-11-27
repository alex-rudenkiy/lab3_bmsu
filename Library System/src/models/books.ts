module.exports = function(sequelize, DataTypes) {
  return sequelize.define('books', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    book_uid: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: "books_book_uid_key"
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    author: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    genre: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    condition: {
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: "EXCELLENT"
    }
  }, {
    sequelize,
    tableName: 'books',
    schema: 'library_system',
    timestamps: false,
    indexes: [
      {
        name: "books_book_uid_key",
        unique: true,
        fields: [
          { name: "book_uid" },
        ]
      },
      {
        name: "books_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
