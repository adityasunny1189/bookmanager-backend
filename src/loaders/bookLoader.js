import DataLoader from "dataloader";
import Book from "../models/Book.js";
import Author from "../models/Author.js";

export const bookLoader = new DataLoader(async (authorIds) => {
    const authorWithBooks = await Author.findAll({
        where: { id: authorIds },
        include: {
            model: Book,
            as: 'books',
        },
    });

    const authorBookMap = new Map();
    authorWithBooks.forEach((author) => {
        authorBookMap.set(author.id, author.books);
    });

    return authorIds.map(authorId => authorBookMap.get(authorId) || []);
});
