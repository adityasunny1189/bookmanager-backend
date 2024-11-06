import { Sequelize } from "sequelize";
import Book from "../models/Book.js";
import Author from "../models/Author.js";

class BookServiceClass {
    async createBook({ title, description, publishedDate }) {
        return await Book.create({
            title: title,
            description: description,
            publishedDate: publishedDate
        });
    }

    async updateBook(id, { title, description, publishedDate }) {
        const book = await Book.findByPk(id);
        if (!book) {
            throw new Error('Book not found');
        }

        await Book.update({
            title: title,
            description: description,
            publishedDate: publishedDate
        }, {
            where: {
                id: id
            }
        });

        book = await Book.findByPk(id);
        return book;
    }

    async deleteBook(id) {
        const book = await Book.findByPk(id);
        if (!book) {
            throw new Error('Book not found');
        }

        await Book.destroy({
            where: {
                id: id
            }
        });

        return book;
    }

    async addAuthorToBook(authorId, bookId, loaders) {
        const book = await Book.findByPk(bookId);
        if (!book) {
            throw new Error('Book not found');
        }

        const author = await Author.findByPk(authorId);
        if (!author) {
            throw new Error('Author not found');
        }

        await book.addAuthor(author);

        // clear the dataloader cache
        loaders.authorLoader.clear(bookId);
        
        return await Book.findByPk(bookId);
    }

    async getBooks({ filter = {}, page = 1, limit = 10 }) {
        const offset = (page - 1) * limit;

        const where = {};
        // if (filter.title) {
        //     where.title = {
        //         [Sequelize.Op.like]: `%${filter.title}%`, 
        //     };
        // }
        // if (filter.authorId) {
        //     where.authorId = filter.authorId;
        // }
        // if (filter.publishedDate) {
        //     where.publishedDate = filter.publishedDate;
        // }

        const books = await Book.findAll({
            where,
            limit,
            offset,
            order: [['title', 'ASC']],
        });

        const totalBooks = books.length;
        console.log("Total books: ", totalBooks);

        return {
            books,
            totalPages: Math.ceil(totalBooks / limit),
            currentPage: page,
        };
    }

    async getBookById(id) {
        return await Book.findByPk(id);
    }
}

export const BookService = new BookServiceClass();
