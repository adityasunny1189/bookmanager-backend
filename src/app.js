import express, { json, urlencoded } from "express";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { typeDefs } from "./schema/typeDefs.js";
import { resolvers } from "./resolvers/resolver.js";
import { config } from "dotenv";
import getContext from "./utils/context.js";
import mongoInit from "./utils/mongoInit.js";
import postgresInit from "./utils/postgresInit.js";
config({ path: "./src/config.env" });

postgresInit();
mongoInit();

// Create an express app
export const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(
    cors({
        origin: "*",
    })
);

app.get("/", (req, res) => {
    res.json({
        message: "Hello World",
    });
});

// Create an Apollo Graphql Server
const graphqlServer = new ApolloServer({
    typeDefs,
    resolvers,
});

await graphqlServer.start();

app.use(
    "/graphql",
    expressMiddleware(graphqlServer, {
        context: getContext,
    })
);

app.all("*", (req, res, next) => {
    res.status(404).json({
        status: `fail`,
        message: `can't find the ${req.method} on url ${req.originalUrl} on the server`,
    });
});
