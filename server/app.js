const express = require("express");
const app = express();
const graphqlHTTP = require("express-graphql");

app.use("/graphql", graphqlHTTP({}));

app.listen(4000, function() {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:4000");
});
