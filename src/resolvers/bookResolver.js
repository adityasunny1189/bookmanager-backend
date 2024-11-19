export const bookResolver = {
    authors: async (parent, args, context) => {
        return await context.loaders.authorLoader.load(parent.id);
    },
    reviewsAndRating: async (parent, args, context) => {
        return await context.loaders.reviewLoader.load(parent.id);
    },
};
