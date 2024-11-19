export const authorResolver = {
    books: async (parent, args, context) => {
        return await context.loaders.bookLoader.load(parent.id);
    },
};
