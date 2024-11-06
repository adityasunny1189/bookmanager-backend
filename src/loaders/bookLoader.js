import DataLoader from "dataloader";
import Book from "../models/Book.js";

export const bookLoader = new DataLoader(async (authorIds) => {
    const books = await Book.findAll({
        where: { authorId: authorIds },
    });

    const authorBookMap = new Map();
    books.forEach((book) => {
        if (!authorBookMap.has(book.authorId)) {
            authorBookMap.set(book.authorId, [book]);
        } else {
            authorBookMap.get(book.authorId).push(book);
        }
    });

    return authorIds.map(authorId => authorBookMap.get(authorId) || []);
});
