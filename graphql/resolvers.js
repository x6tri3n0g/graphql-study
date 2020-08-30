import { getById, people } from './db';

const resolvers = {
    Query: {
        people: () => people,
        person: () => id === getById(),
    },
};

export default resolvers;
