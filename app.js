const express = require("express");
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql").graphqlHTTP;

const mongoose = require("mongoose");

const graphQlSchema = require("./graphql/schema/index");
const graphQlResolvers = require("./graphql/resolvers/index");

const app = express();

// request.body에 있는 데이터에 접근하기위해서 사용
app.use(bodyParser.json());

app.use(
  "/graphql",
  graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true,
  })
);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}kdt.u71doty.mongodb.net/graphql?retryWrites=true&w=majority`
  )
  .then(() => {
    // 연결되면 server 실행
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
