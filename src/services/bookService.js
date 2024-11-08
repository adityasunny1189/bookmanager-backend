import { Sequelize } from "sequelize";
import Book from "../models/Book.js";
import Author from "../models/Author.js";
import { BookReviewsAndRating } from "../models/metadata.js";
import { v4 as uuid } from "uuid";

class BookServiceClass {
    async createBook({ title, description, publishedDate }) {
        return await Book.create({
            title: title,
            description: description,
            publishedDate: publishedDate
        });
    }

    async updateBook(id, { title, description, publishedDate }, loaders) {
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

        loaders.bookLoader.clear(id);

        return await Book.findByPk(id);
    }

    async deleteBook(id, loaders) {
        const book = await Book.findByPk(id);
        if (!book) {
            throw new Error('Book not found');
        }

        await Book.destroy({
            where: {
                id: id
            }
        });

        loaders.bookLoader.clear(id);

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
        loaders.bookLoader.clear(authorId);

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

    async addReviewAndRatingToBook(bookId, userId, review, rating, loaders) {
        const book = await Book.findByPk(bookId);
        if (!book) {
            throw new Error('Book not found');
        }

        const reviewAndRating = new BookReviewsAndRating({
            reviewId: uuid(),
            bookId: bookId,
            userId: userId,
            review: review,
            rating: rating
        });

        await reviewAndRating.save();

        loaders.reviewLoader.clear(bookId);

        return await Book.findByPk(bookId);
    }
}

export const BookService = new BookServiceClass();
