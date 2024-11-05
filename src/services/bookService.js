import Book from "../models/Book.js";

class BookServiceClass {
    async createBook({ title, description, publishedDate }) {
        return await Book.create({
            title: title,
            description: description,
            publishedDate: publishedDate
        });
    }

    async getBooks({ filter, page, limit, offset }) {
        return await Book.findAll();
    }

    async getBookById(id) {
        return await Book.findByPk(id);
    }
}

export const BookService = new BookServiceClass();
