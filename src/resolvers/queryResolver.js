import { AuthorService } from "../services/authorService.js";
import { BookService } from "../services/bookService.js";

export const queryResolver = {
    sayHello: () => "Hello World",
    getBooks: async (parent, args, context) => {
        console.log("context: ", context);
        return await BookService.getBooks(args);
    },
    getBookById: async (parent, args) => {
        return await BookService.getBookById(args.id);
    },
    getAuthors: async (parent, args) => {
        return await AuthorService.getAuthors(args);
    },
    getAuthorById: async (parent, args) => {
        return await AuthorService.getAuthorById(args.id);
    },
};
