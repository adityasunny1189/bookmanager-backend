import { AuthorService } from "../services/authorService.js";
import { BookService } from "../services/bookService.js";

export const mutationResolver = {
    createBook: async (_, args) => {
        return await BookService.createBook(args);
    },
    updateBook: async (_, args) => {
        return await BookService.updateBook(args);
    },
    deleteBook: async (_, args) => {
        return await BookService.deleteBook(args);
    },
    createAuthor: async (_, args) => {
        return await AuthorService.createAuthor(args);
    },
    updateAuthor: async (_, args) => {
        return await AuthorService.updateAuthor(args);
    },
    deleteAuthor: async (_, args) => {
        return await AuthorService.deleteAuthor(args);
    },
    addAuthorToBook: async (_, args) => {
        return await BookService.addAuthorToBook(args);
    },
    addReviewAndRatingToBook: async (_, args) => {
        return await BookService.addReviewAndRatingToBook(args);
    },
};
