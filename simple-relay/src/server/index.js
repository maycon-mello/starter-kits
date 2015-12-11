import express from 'express';
import { Schema } from './data/schema';
import graphQLHTTP from 'express-graphql';

const app = express();
// We respond to all GraphQL requests from `/graphql` using the
// `express-graphql` middleware, which we pass our schema to.
app.use('/', graphQLHTTP({
    schema: Schema,
    pretty: true,
    graphyql: true,
  })
);
app.listen(8080, (err) => {
  if (err) {
    return console.error(err);
  }
  console.log('GraphQL Server is now running on localhost:8080');
});
