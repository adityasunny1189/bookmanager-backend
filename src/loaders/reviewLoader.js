import DataLoader from "dataloader";
import { BookReviewsAndRating } from "../models/metadata.js";

export default function newReviewDataLoader() {
    return new DataLoader(async (bookIds) => {
        const reviews = await BookReviewsAndRating.find({
            bookId: { $in: bookIds },
        });

        const reviewMap = new Map();
        reviews.forEach((review) => {
            if (!reviewMap.has(review.bookId)) {
                reviewMap.set(review.bookId, [review]);
            } else {
                reviewMap.get(review.bookId).push(review);
            }
        });

        return bookIds.map((bookId) => reviewMap.get(bookId) || []);
    });
}
