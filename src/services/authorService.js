import { Sequelize } from "sequelize";
import Author from "../models/Author.js";
import BookAuthor from "../models/BookAuthor.js";

class AuthorServiceClass {
    async createAuthor({ name, biography, bornDate }) {
        return await Author.create({
            name: name,
            biography: biography,
            bornDate: bornDate,
        });
    }

    async updateAuthor({ id, name, biography, bornDate }) {
        const author = await Author.findByPk(id);
        if (!author) {
            throw new Error("Author not found");
        }

        await Author.update(
            {
                name: name,
                biography: biography,
                bornDate: bornDate,
            },
            {
                where: {
                    id: id,
                },
            }
        );

        return await Author.findByPk(id);
    }

    async deleteAuthor({ id }) {
        const author = await Author.findByPk(id);
        if (!author) {
            throw new Error("Author not found");
        }

        await Author.destroy({
            where: {
                id: id,
            },
        });

        return author;
    }

    async getAuthors({ filter = {}, page = 1, limit = 10 }) {
        const offset = (page - 1) * limit;

        const where = {};
        const bookFilter = {};
        let findByBook = false;
        if (filter.bookId) {
            bookFilter.bookId = filter.bookId;
            findByBook = true;
        }

        const authorIds = await BookAuthor.findAll({
            where: bookFilter,
        });

        console.log("Author Ids: ", JSON.stringify(authorIds));

        if (filter.bornDate) {
            where.bornDate = filter.bornDate;
        }

        let authors = await Author.findAll({
            where,
            limit,
            offset,
            order: [["name", "ASC"]],
        });

        if (findByBook) {
            authors = authors.filter((author) => {
                return authorIds.find((data) => data.AuthorId === author.id);
            });
        }

        const totalAuthors = authors.length;
        console.log("Total authors: ", totalAuthors);

        return {
            authors,
            totalPages: Math.ceil(totalAuthors / limit),
            currentPage: page,
        };
    }

    async getAuthorById({ id }) {
        return await Author.findByPk(id);
    }
}

export const AuthorService = new AuthorServiceClass();
