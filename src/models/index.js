import Book from "./Book.js";
import Author from "./Author.js";
import BookAuthor from "./BookAuthor.js";

Book.belongsToMany(Author, { through: BookAuthor, as: "authors" });
Author.belongsToMany(Book, { through: BookAuthor, as: "books" });

export { Book, Author };
