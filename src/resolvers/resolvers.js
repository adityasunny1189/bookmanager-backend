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
            return await context.authorLoader.load(parent.authorId);
        }
    },
    Author: {
        books: async (parent, args, context) => {
            return await context.bookLoader.load(parent.bookId);
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
        }
    }
}
