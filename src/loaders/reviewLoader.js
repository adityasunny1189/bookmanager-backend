import DataLoader from "dataloader";
import { BookReviewsAndRating } from "../models/metadata.js";

export default function newReviewDataLoader() {
    return new DataLoader(async (bookIds) => {
        const reviews = await BookReviewsAndRating.find({
            bookId: { $in: bookIds },
        });

        return bookIds.map((bookId) =>
            reviews.filter((review) => review.bookId === bookId)
        );
    });
}
