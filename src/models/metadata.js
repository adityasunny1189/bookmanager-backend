import { Schema, model } from "mongoose";

const bookReviewsAndRatingSchema = new Schema({
    reviewId: {
        type: String,
        required: [true, 'A review id is required']
    },
    bookId: {
        type: String,
        required: [true, 'A book id is required']
    },
    userId: {
        type: String,
        required: [true, 'A user id is required']
    },
    rating: {
        type: Number,
        required: [true, 'A rating is required'],
        min: [1, 'Rating must be at least 1'],
        max: [5, 'Rating must be at most 5']
    },
    review: {
        type: String,
        required: [true, 'A review is required'],
        minLength: [10, 'Review must be at least 10 characters'],
        maxLength: [500, 'Review must be less than 500 characters']
    },
});

export const BookReviewsAndRating = model('BookReviewsAndRating', bookReviewsAndRatingSchema);
