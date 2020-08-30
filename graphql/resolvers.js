const xtring = {
    name: 'hyun',
    age: 27,
    gender: 'male',
};

const resolvers = {
    Query: {
        person: () => xtring,
    },
};

export default resolvers;
