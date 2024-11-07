import { Sequelize } from "sequelize";
import Author from "../models/Author.js";


class AuthorServiceClass {
    async createAuthor({ name, biography, bornDate }) {
        return await Author.create({
            name: name,
            biography: biography,
            bornDate: bornDate
        });
    }

    async updateAuthor(id, { name, biography, bornDate }, loaders) {
        const author = await Author.findByPk(id);
        if (!author) {
            throw new Error('Author not found');
        }

        await Author.update({
            name: name,
            biography: biography,
            bornDate: bornDate
        }, {
            where: {
                id: id
            }
        });

        loaders.authorLoader.clear(id);

        return await Author.findByPk(id);
    }

    async deleteAuthor(id, loaders) {
        const author = await Author.findByPk(id);
        if (!author) {
            throw new Error('Author not found');
        }

        await Author.destroy({
            where: {
                id: id
            }
        });

        loaders.authorLoader.clear(id);

        return author;
    }

    async getAuthors({ filter = {}, page = 1, limit = 10 }) {
        const offset = (page - 1) * limit;

        const where = {};
        if (filter.name) {
            where.name = {
                [Sequelize.Op.like]: `%${filter.name}%`, 
            };
        }

        if (filter.bornDate) {
            where.bornDate = filter.bornDate;
        }

        const authors = await Author.findAll({
            where,
            limit,
            offset,
            order: [['name', 'ASC']],
        });

        const totalAuthors = authors.length;
        console.log("Total authors: ", totalAuthors);

        return {
            authors,
            totalPages: Math.ceil(totalAuthors / limit),
            currentPage: page,
        };
    }

    async getAuthorById(id) {
        return await Author.findByPk(id);
    }
}

export const AuthorService = new AuthorServiceClass();
