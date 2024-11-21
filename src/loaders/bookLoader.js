import DataLoader from "dataloader";
import Book from "../models/Book.js";
import Author from "../models/Author.js";

export default function newBookDataLoader() {
    return new DataLoader(async (authorIds) => {
        console.log("AuthorIds: ", authorIds);
        const authorWithBooks = await Author.findAll({
            where: { id: authorIds },
            include: {
                model: Book,
                as: "books",
            },
        });

        return authorIds.map((authorId) => {
            return authorWithBooks
                .filter((author) => author.id === authorId)
                .flatMap((author) => author.books);
        });
    });
}
