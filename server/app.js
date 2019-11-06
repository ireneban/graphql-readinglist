const express = require("express");
const app = express();
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true /* to allow to test using graphiql */
  })
);

app.listen(4000, function() {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:4000");
});
