import express, { json, urlencoded } from 'express';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs } from './schema/typeDefs.js';
import { resolvers } from './resolvers/resolvers.js';
import { authorLoader } from './loaders/authorLoader.js';

export const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors({
    origin: '*'
}));

const graphqlServer = new ApolloServer({
    typeDefs,
    resolvers
});

await graphqlServer.start();

app.get('/', (req, res) => {
    res.json({
        message: "Hello World"
    });
});

app.use("/graphql", expressMiddleware(graphqlServer, {
    context: ({ req }) => {
        return {
            loaders: {
                authorLoader: authorLoader
            },
            name: "Bookmanager Context"
        }
    }
}));

app.all('*', (req, res, next) => {
    res.status(404).json({
        status: `fail`,
        message: `can't find the ${req.method} on url ${req.originalUrl} on the server`
    });
});
