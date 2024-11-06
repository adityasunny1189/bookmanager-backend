import DataLoader from "dataloader"
import Author from "../models/Author.js";
import Book from "../models/Book.js";

export const authorLoader = new DataLoader(async (bookIds) => {
    const booksWithAuthors = await Book.findAll({
        where: { id: bookIds },
        include: {
            model: Author,
            as: 'authors', 
        },
    });

    const bookAuthorMap = new Map();
    booksWithAuthors.forEach((book) => {
        bookAuthorMap.set(book.id, book.authors);
    });

    return bookIds.map(bookId => bookAuthorMap.get(bookId) || []);
});
