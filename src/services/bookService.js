import Book from "../models/Book.js";

class bookServiceClass {
    async createBook({ title, description, publishedDate }) {
        console.log("Args value: ", title, description, publishedDate);
        return await Book.create({
            title: title,
            description: description,
            publishedDate: publishedDate
        });
    }

    async getBooks() {
        return await Book.findAll();
    }

    async getBookById(id) {
        return await Book.findByPk(id);
    }
}

export const bookService = new bookServiceClass();
