import DataLoader from "dataloader";
import Author from "../models/Author.js";
import Book from "../models/Book.js";

export default function newAuthorDataLoader() {
    console.log("Initiating new author data loader");
    return new DataLoader(async (bookIds) => {
        console.log("BookIds: ", bookIds);
        const booksWithAuthors = await Book.findAll({
            where: { id: bookIds },
            include: {
                model: Author,
                as: "authors",
            },
        });

        return bookIds.map((bookId) => {
            return booksWithAuthors
                .filter((book) => book.id === bookId)
                .flatMap((book) => book.authors);
        });
    });
}
