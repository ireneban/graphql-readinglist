const express = require("express");
const app = express();
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");

// allow cross-origin request
app.use(cors());

// connect to mongoose
mongoose.connect("mongodb://localhost:27017/myapp", { useNewUrlParser: true });
mongoose.connection.once("open", () => {
  console.log("Connected to database");
});

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
