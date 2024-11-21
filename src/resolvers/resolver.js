import { GraphQLScalarType, Kind } from "graphql";
import { bookResolver } from "./bookResolver.js";
import { authorResolver } from "./authorResolver.js";
import { queryResolver } from "./queryResolver.js";
import { mutationResolver } from "./mutationResolver.js";

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
        },
    }),
    Book: bookResolver,
    Author: authorResolver,
    Query: queryResolver,
    Mutation: mutationResolver,
};
