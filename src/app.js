import express, { json, urlencoded } from 'express';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs } from './schema/typeDefs.js';
import { resolvers } from './resolvers/resolvers.js';
import { authorLoader } from './loaders/authorLoader.js';
import Book from './models/Book.js';
import Author from './models/Author.js';
import associateModels from './models/models.js';
import { sequelize } from './utils/database.js';
import { bookLoader } from './loaders/bookLoader.js';
import { connect } from 'mongoose';
import { reviewLoader } from './loaders/reviewLoader.js';

// Create models association
const models = {Book, Author};
associateModels(models);

// Initialize sequelize (connect to the database)
sequelize
    .sync()
    .then(() => {
        console.log("Created tables");
    })
    .catch((error) => {
        console.log("Error Creating tables: ", error);
        process.exit(1);
    });

// Initialize mongoose (connect to the database)
const MONGO_DB_PATH = process.env.MONGO_DB_PATH;

connect(MONGO_DB_PATH, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((data) => {
    console.log("connected to mongo db");
}).catch(err => {
    console.log("Error connecting to mongo DB: ", err);
    process.exit(1);
});

// Create an express app
export const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors({
    origin: '*'
}));

// Create an Apollo Graphql Server
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
                authorLoader: authorLoader,
                bookLoader: bookLoader,
                reviewLoader: reviewLoader
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
