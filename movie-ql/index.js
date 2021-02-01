import { GraphQLServer } from 'graphql-yoga';
import resolvers from './graphql/resolvers';

const server = new GraphQLServer({
    typeDefs: 'graphql/schema.graphql',
    resolvers, // resolvers: resolvers, // => ES6 문법의 "파괴할당"
});

server.start(() => console.log('GraphQL Server Running'));
