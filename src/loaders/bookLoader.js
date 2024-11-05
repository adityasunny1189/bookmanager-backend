import DataLoader from "dataloader";
import Book from "../models/Book.js";

export const bookLoader = new DataLoader(async (bookIds) => {
    const books = await Book.findAll({
        where: {
            id: bookIds
        }
    });
    const bookMap = new Map(books.map(book => [book.id, book]));
    return bookIds.map(bookId => bookMap.get(bookId));
});
