import express, { json, urlencoded } from 'express';
import cors from 'cors';

export const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors({
    origin: '*'
}));

app.get('/', (req, res) => {
    res.json({
        message: "Hello World"
    });
});

app.all('*', (req, res, next) => {
    res.status(404).json({
        status: `fail`,
        message: `can't find the ${req.method} on url ${req.originalUrl} on the server`
    });
});
