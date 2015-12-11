/*
 A GraphQL schema describes your data model,
 and provides a GraphQL server with an associated set of resolve methods that know how to fetch data.
 We will use graphql-js to build our schema.
 */
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

 //Data base functions
 import { findContact, getContact } from './db';

// Creating a GraphQLType
const GraphQLContact = new GraphQLObjectType({
  name: 'Contact',
  description: 'This represents a Contact',
  fields: () => {
    return {
      id: {
        description: 'Contact id',
        type: GraphQLInt
      },
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
    }
  }
 });

 const Query = new GraphQLObjectType({
   name: 'Query',
   description: 'This is a root query',
   fields: () => {
     return {
       contact: {
         type: new GraphQLList(GraphQLContact),
         // Used to verify which attributes will be used as arguments
         // Just for a Security reason
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
           // the first parameter is an undefined variable. At this point I don't care why ^^
           return findContact(args);
         }
       }
     }
   }
 });

 const Schema = new GraphQLSchema({
   query: Query
 })

 export default Schema;
