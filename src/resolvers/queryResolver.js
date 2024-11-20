import { AuthorService } from "../services/authorService.js";
import { BookService } from "../services/bookService.js";

export const queryResolver = {
    sayHello: () => "Hello World",
    getBooks: async (_, args) => {
        return await BookService.getBooks(args);
    },
    getBookById: async (_, args) => {
        return await BookService.getBookById(args);
    },
    getAuthors: async (_, args) => {
        return await AuthorService.getAuthors(args);
    },
    getAuthorById: async (_, args) => {
        return await AuthorService.getAuthorById(args);
    },
};
