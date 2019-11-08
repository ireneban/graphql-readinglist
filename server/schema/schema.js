/*
In this file, we describe a schema which shows data types, relations between things... 
*/
const graphql = require("graphql");
const _ = require("lodash");
const Book = require("../models/bookModel");
const Author = require("../models/authorModel");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;

// dummy data
// relation: link with authors by authorId
// var books = [
//   { name: "Name of the Wind", genre: "Fantasy", id: "1", authorId: "1" },
//   { name: "The Final Empire", genre: "Fantasy", id: "2", authorId: "2" },
//   { name: "The Long Earth", genre: "Sci-Fi", id: "3", authorId: "3" },
//   { name: "The Hero of Ages", genre: "Fantasy", id: "4", authorId: "2" },
//   { name: "The Colour of Magic", genre: "Fantasy", id: "5", authorId: "3" },
//   { name: "The Light Fantastic", genre: "Fantasy", id: "6", authorId: "3" }
// ];
// var authors = [
//   { name: "Patrick Rothfuss", age: 44, id: "1" },
//   { name: "Brandon Sanderson", age: 42, id: "2" },
//   { name: "Terry Pratchett", age: 66, id: "3" }
// ];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID }, // this rely on requested id type --> so convenient!
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        // return _.find(authors, { id: parent.authorId });
        return Author.findById(parent.authorId);
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    book: {
      type: GraphQLList(BookType) /* List of books */,
      resolve(parent, args) {
        // return _.filter(books, { authorId: parent.id });
        return Book.find({ authorId: parent.id });
      }
    }
  })
});

// Entry point to get into the graph
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      // query book with bookType by id as arg
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // relationship between data
        // code to get data from db / other source when requested
        // for now, we use dummy data which is a simple array --> use lodash
        // return _.find(books, { id: args.id });
        return Book.findById(args.id);
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return _.find(authors, { id: args.id });
        return Author.findById(args.id);
      }
    },
    // query all of books
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return books;
        return Book.find({});
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        // return authors;
        return Author.find({});
      }
    }
  }
});

// When making changes on database
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    /* Adding Author */
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(parent, args) {
        // Instance of Author Model
        let author = new Author({
          name: args.name,
          age: args.age
        });
        // Put into database and return
        return author.save();
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId
        });
        return book.save();
      }
    }
  }
});

/**
 example request
 mutation {
  addAuthor(name: "Mijeong", age: 26){
    name
    age
  }
}
 */

// create Graphql schema and export schema
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
