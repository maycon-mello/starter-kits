// This module exports a GraphQL Schema, which is a declaration of all the
// types, queries and mutations we'll use in our system.
import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLSchema
} from 'graphql';

// Relay adds some specific types that it needs to function, including Node, Edge, Connection
import {
  fromGlobalId,
  globalIdField,
  nodeDefinitions
} from 'graphql-relay';

const example = {
  id: 25,
  text: 'Text returned'
};

// Firstly we need to create the Node interface in our system. This has nothing
// to do with Node.js! In Relay, Node refers to an entity – that is, an object
// with an ID.

// To create this interface, we need to pass in a resolving function as the
// first arg to nodeDefinitions that can fetch an entity given a global Relay
// ID. The second arg can be used to resolve an entity into a GraphQL type –
// but it's actually optional, so we'll leave it out and use isTypeOf on the
// GraphQL types further below.


/**
 * The first argument defines the way to resolve an ID to its object.
 * The second argument defines the way to resolve a node object to its GraphQL type.
 */
var { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    let { id, type } = fromGlobalId(globalId);
    // This attribute  doesn't need to be equals Example class
    // Just need to match with exampleType name
    if (type === 'Example')
      return example;
    return null;
  },
  (obj) => {
    return exampleType;
  }
);

// We can now use the Node interface in the GraphQL types of our schema
// Creating a exampleType
var exampleType = new GraphQLObjectType({
  // need to mach with interface conditions above "if (type === 'Example') {"
  name: 'Example',
  fields: () => ({
    id: globalIdField('Example'),
    text: {
      type: GraphQLString,
      description: 'Hello World'
    }
  }),
  interfaces: [ nodeInterface ]
});

var queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: nodeField,
    example: {
      type: exampleType,
      resolve: () => example
    }
  })
});

export var Schema = new GraphQLSchema({
  query: queryType
});