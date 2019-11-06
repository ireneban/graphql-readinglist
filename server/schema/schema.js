/*
In this file, we describe a schema which shows data types, relations between things... 
*/
const graphql = require("graphql");
const _ = require("lodash");
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

// dummy data
var books = [
  { name: "Name of the Wind", genre: "Fantasy", id: "1" },
  { name: "The Final Empire", genre: "Fantasy", id: "2" },
  { name: "The Long Earth", genre: "Sci-Fi", id: "3" }
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString }
  })
});

// Entry point to get into the graph
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      // query book with bookType by id as arg
      type: BookType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        // relationship between data
        // code to get data from db / other source when requested
        // for now, we use dummy data which is a simple array --> use lodash
        _.find(books, { id: args.id });
      }
    }
  }
});

/* 
example request:
book(id: "2") {
  name
  genre
}
*/

// create Graphql schema and export schema
module.exports = new GraphQLSchema({
  query: RootQuery
});
