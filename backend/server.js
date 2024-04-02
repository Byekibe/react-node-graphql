import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import { typeDefs, resolvers } from "./resolvers/resolvers.js";
import dotenv from "dotenv";
dotenv.config();

const server = new ApolloServer({ typeDefs, resolvers });

await server.start();

const app = express();

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () => {
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
});
