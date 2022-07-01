import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from './graphql/helloResolver';
import { PORT } from './constants';

const startServer = async () => {
  const app = express();

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver],
    }),
  });

  await server.start();
  server.applyMiddleware({ app });

  app.listen(PORT, () => {
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
  });
};

startServer().catch((err) => console.log(err));
