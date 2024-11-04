
export const resolvers = {
    Book: {
        author: async (parent, args, context) => {
            return await context.authorLoader.load(parent.authorId);
        }
    },
    Query: {
        sayHello: () => "Hello World"
    }
}
