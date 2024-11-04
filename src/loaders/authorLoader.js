import DataLoader from "dataloader"
import Author from "../models/Author.js";

export const authorLoader = new DataLoader(async (authorIds) => {
    const authors = await Author.findAll({
        where: {
            id: authorIds
        }
    });
    const authorMap = new Map(authors.map(author => [author.id, author]));
    return authorIds.map(authorId => authorMap.get(authorId));
});
