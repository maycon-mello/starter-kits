// This module exports a GraphQL Schema, which is a declaration of all the
// types, queries and mutations we'll use in our system.
import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

// Relay adds some specific types that it needs to function, including Node, Edge, Connection
var GraphQLRelay = require('graphql-relay')

import { findContact, getContact, Contact} from './database';

// Firstly we need to create the Node interface in our system. This has nothing
// to do with Node.js! In Relay, Node refers to an entity – that is, an object
// with an ID.

// To create this interface, we need to pass in a resolving function as the
// first arg to nodeDefinitions that can fetch an entity given a global Relay
// ID. The second arg can be used to resolve an entity into a GraphQL type –
// but it's actually optional, so we'll leave it out and use isTypeOf on the
// GraphQL types further below.

var nodeDefinitions = GraphQLRelay.nodeDefinitions(function(globalId) {
  var idInfo = GraphQLRelay.fromGlobalId(globalId)
  if (idInfo.type == 'Contact') {
    return getContact(idInfo.id)
  }
  // else if (...) {
  //   here you can create new conditions for new interfaces
  // }
  return null
});

// We can now use the Node interface in the GraphQL types of our schema

// Creating a GraphQLType
const GraphQLContact = new GraphQLObjectType({
  name: 'Contact',
  description: 'This represents a Contact',

  // Relay will use this function to determine if an object in your system is
  // of a particular GraphQL type
  isTypeOf: function(obj) { return obj instanceof Contact },

  // We can either declare our fields as an object of name-to-definition mappings
  // or a closure that returns said object (see userType below)
  fields: {
    id: GraphQLRelay.globalIdField('Contact'),
    name: {
      description: 'Contact name',
      type: GraphQLString
    },
    age: {
      description: 'Contact age',
      type: GraphQLInt
    },
    birthYear: {
      description: "Birth year",
      type: GraphQLInt,
      // Just for an example, creating a new custom field
      // It calc and return the birth year
      resolve(contact) {
        return new Date().getFullYear() - contact.age;
      }
    }
  },

  // This declares this GraphQL type as a Node
  interfaces: [nodeDefinitions.nodeInterface]
 });


const Query = new GraphQLObjectType({
   name: 'Query',
   description: 'This is a root query',
   fields: {
      // Relay needs this to query Nodes using global IDs
     node: nodeDefinitions.nodeField,
      // Our own root query field(s) go here
     contact: {
       type: new GraphQLList(GraphQLContact),
       // Used to verify which attributes will be used as arguments
       // Just for Security reason
       args: {
         id: {
           type: GraphQLInt
         },
         name: {
           type: GraphQLString
         },
         age: {
           type: GraphQLInt
         }
       },
       resolve(_, args) {
         // the first parameter is an undefined variable. At this point you don't care why ^^
         return findContact(args);
       }
     }
   }
 });
// Now we can bundle our types up and export a schema
// GraphQL expects a set of top-level queries and optional mutations (we have
// none in this simple example so we leave the mutation field out)
module.exports  = new GraphQLSchema({
 query: Query
});
