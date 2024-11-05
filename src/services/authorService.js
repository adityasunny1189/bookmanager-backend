import Author from "../models/Author.js";


class AuthorServiceClass {
    async createAuthor({ name, biography, bornDate }) {
        return await Author.create({
            name: name,
            biography: biography,
            bornDate: bornDate
        });
    }

    async getAuthors({ filter, page, limit, offset }) {
        return await Author.findAll();
    }

    async getAuthorById(id) {
        return await Author.findByPk(id);
    }
}

export const AuthorService = new AuthorServiceClass();
