import { AuthorService } from "../services/authorService.js";
import { BookService } from "../services/bookService.js";

export const mutationResolver = {
    createBook: async (parent, args) => {
        return await BookService.createBook(args);
    },
    updateBook: async (parent, args, { loaders }) => {
        return await BookService.updateBook(args.id, args, loaders);
    },
    deleteBook: async (parent, args, { loaders }) => {
        return await BookService.deleteBook(args.id, loaders);
    },
    createAuthor: async (parent, args) => {
        return await AuthorService.createAuthor(args);
    },
    updateAuthor: async (parent, args, { loaders }) => {
        return await AuthorService.updateAuthor(args.id, args, loaders);
    },
    deleteAuthor: async (parent, args, { loaders }) => {
        return await AuthorService.deleteAuthor(args.id, loaders);
    },
    addAuthorToBook: async (parent, args, { loaders }) => {
        return await BookService.addAuthorToBook(
            args.authorId,
            args.bookId,
            loaders
        );
    },
    addReviewAndRatingToBook: async (parent, args, { loaders }) => {
        return await BookService.addReviewAndRatingToBook(
            args.bookId,
            args.userId,
            args.review,
            args.rating,
            loaders
        );
    },
};
