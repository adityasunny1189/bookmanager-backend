import { GraphQLScalarType, Kind } from "graphql";
import { bookService } from "../services/bookService.js";

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
        books: async (parent) => {
            return await parent.getBooks();
        }
    },
    Query: {
        sayHello: () => "Hello World",
        getBooks: async () => {
            return await bookService.getBooks();
        },
    },
    Mutation: {
        createBook: async (parent, args) => {
            return await bookService.createBook(args);
        }
    }
}
