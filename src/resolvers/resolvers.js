import { GraphQLScalarType, Kind } from "graphql";
import { BookService } from "../services/bookService.js";
import { AuthorService } from "../services/authorService.js";

export const resolvers = {
    Date: new GraphQLScalarType({
        name: "Date",
        description: "Date custom scalar type",
        parseValue(value) {
            return new Date(value);
        },
        serialize(value) {
            return value.getTime();
        },
        parseLiteral(ast) {
            if (ast.kind === Kind.INT) {
                return parseInt(ast.value, 10);
            }
            return null;
        }
    }),
    Book: {
        authors: async (parent, args, context) => {
            return await context.loaders.authorLoader.load(parent.id);
        },
        reviewsAndRating: async (parent, args, context) => {
            return await context.loaders.reviewLoader.load(parent.id);
        }
    },
    Author: {
        books: async (parent, args, context) => {
            return await context.loaders.bookLoader.load(parent.id);
        }
    },
    Query: {
        sayHello: () => "Hello World",
        getBooks: async (parent, args) => {
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
        }
    },
    Mutation: {
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
            return await BookService.addAuthorToBook(args.authorId, args.bookId, loaders);
        },
        addReviewAndRatingToBook: async (parent, args, { loaders }) => {
            return await BookService.addReviewAndRatingToBook(args.bookId, args.userId, args.review, args.rating, loaders);
        }
    }
}
