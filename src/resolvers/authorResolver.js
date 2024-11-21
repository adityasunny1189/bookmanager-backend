export const authorResolver = {
    books: async (author, _args, context) => {
        return await context.loaders.bookLoader.load(author.id);
    },
};
