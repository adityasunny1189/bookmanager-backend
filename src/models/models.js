
export default function associateModels(models) {
    const { Book, Author } = models;
    Book.belongsToMany(Author, { through: 'BookAuthors', as: 'authors' });
    Author.belongsToMany(Book, { through: 'BookAuthors', as: 'books' });
}
