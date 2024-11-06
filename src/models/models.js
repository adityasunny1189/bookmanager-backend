import BookAuthor from "./BookAuthor.js";

export default function associateModels(models) {
    const { Book, Author } = models;
    Book.belongsToMany(Author, { through: BookAuthor, as: 'authors' });
    Author.belongsToMany(Book, { through: BookAuthor, as: 'books' });
}
