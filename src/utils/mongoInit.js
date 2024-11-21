import { connect } from "mongoose";

export default function mongoInit() {
    const MONGO_DB_PATH =
        process.env.MONGO_DB_PATH || "mongodb://localhost:27017/bookmanager";

    connect(MONGO_DB_PATH, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then((data) => {
            console.log("connected to mongo db");
        })
        .catch((err) => {
            console.log("Error connecting to mongo DB: ", err);
            process.exit(1);
        });
}
