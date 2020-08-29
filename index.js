import { GraphQLServer } from 'graphql-yoga';

const server = new GraphQLServer({
    /* Magic! */
});

server.start(() => console.log('GraphQL Server Running'));
