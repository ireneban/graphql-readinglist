/*
In this file, we describe a schema which shows data types, relations between things... 
*/
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      // query book with bookType by id as arg
      type: BookType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        // relationship between data
        // code to get data from db / other source
      }
    }
  }
});

// exporting schema
module.exports = new GraphQLSchema({
  query: RootQuery
});
