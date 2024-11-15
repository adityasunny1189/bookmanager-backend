import { Sequelize } from "sequelize";
import Book from "../models/Book.js";
import Author from "../models/Author.js";
import { BookReviewsAndRating } from "../models/metadata.js";
import { v4 as uuid } from "uuid";
import BookAuthor from "../models/BookAuthor.js";

class BookServiceClass {
    async createBook({ title, description, publishedDate }) {
        return await Book.create({
            title: title,
            description: description,
            publishedDate: publishedDate,
        });
    }

    async updateBook(id, { title, description, publishedDate }, loaders) {
        const book = await Book.findByPk(id);
        if (!book) {
            throw new Error("Book not found");
        }

        await Book.update(
            {
                title: title,
                description: description,
                publishedDate: publishedDate,
            },
            {
                where: {
                    id: id,
                },
            }
        );

        loaders.bookLoader.clear(id);

        return await Book.findByPk(id);
    }

    async deleteBook(id, loaders) {
        const book = await Book.findByPk(id);
        if (!book) {
            throw new Error("Book not found");
        }

        await Book.destroy({
            where: {
                id: id,
            },
        });

        loaders.bookLoader.clear(id);

        return book;
    }

    async addAuthorToBook(authorId, bookId, loaders) {
        const book = await Book.findByPk(bookId);
        if (!book) {
            throw new Error("Book not found");
        }

        const author = await Author.findByPk(authorId);
        if (!author) {
            throw new Error("Author not found");
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
        const authorFilter = {};
        let findByAuthor = false;
        if (filter.authorId) {
            authorFilter.authorId = filter.authorId;
            findByAuthor = true;
        }

        const booksIds = await BookAuthor.findAll({
            where: authorFilter,
        });

        console.log("Book Ids: ", JSON.stringify(booksIds));

        if (filter.publishedDate) {
            where.publishedDate = filter.publishedDate;
        }

        console.log("Filter: ", filter);

        let books = await Book.findAll({
            where,
            limit,
            offset,
            order: [["title", "ASC"]],
        });

        console.log("Books: ", JSON.stringify(books));

        if (findByAuthor) {
            books = books.filter((book) => {
                return booksIds.find((data) => data.BookId === book.id);
            });
        }

        const totalBooks = books.length;
        console.log(
            "Total books: ",
            totalBooks,
            " total pages: ",
            Math.ceil(totalBooks / limit)
        );
        console.log("Books: ", JSON.stringify(books));

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
            throw new Error("Book not found");
        }

        const reviewAndRating = new BookReviewsAndRating({
            id: uuid(),
            bookId: bookId,
            userId: userId,
            review: review,
            rating: rating,
        });

        await reviewAndRating.save();

        loaders.reviewLoader.clear(bookId);

        return await Book.findByPk(bookId);
    }
}

export const BookService = new BookServiceClass();
