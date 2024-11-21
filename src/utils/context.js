import newReviewDataLoader from "../loaders/reviewLoader.js";
import newBookDataLoader from "../loaders/bookLoader.js";
import newAuthorDataLoader from "../loaders/authorLoader.js";

export default function getContext({ req, res }) {
    return {
        loaders: {
            authorLoader: newAuthorDataLoader(),
            bookLoader: newBookDataLoader(),
            reviewLoader: newReviewDataLoader(),
        },
        name: "Bookmanager Context",
    };
}
