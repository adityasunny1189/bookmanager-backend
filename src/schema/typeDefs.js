import fs from 'fs';
import path from 'path';

export const typeDefs = fs.readFileSync(
    path.join(path.resolve(), './src/schema/schema.graphql'),
    'utf8'
);
