export const bookResolver = {
    authors: async (book, _args, context) => {
        return await context.loaders.authorLoader.load(book.id);
    },
    reviewsAndRating: async (book, _args, context) => {
        return await context.loaders.reviewLoader.load(book.id);
    },
};
