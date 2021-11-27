var DataTypes = require("sequelize").DataTypes;
var _books = require("./books");
var _library = require("./library");
var _library_books = require("./library_books");
var _rating = require("./rating");
var _reservation = require("./reservation");

function initModels(sequelize) {
  var books = _books(sequelize, DataTypes);
  var library = _library(sequelize, DataTypes);
  var library_books = _library_books(sequelize, DataTypes);
  var rating = _rating(sequelize, DataTypes);
  var reservation = _reservation(sequelize, DataTypes);

  library_books.belongsTo(books, { as: "book", foreignKey: "book_id"});
  books.hasMany(library_books, { as: "library_books", foreignKey: "book_id"});
  library_books.belongsTo(books, { as: "library", foreignKey: "library_id"});
  books.hasMany(library_books, { as: "library_library_books", foreignKey: "library_id"});

  return {
    books,
    library,
    library_books,
    rating,
    reservation,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
