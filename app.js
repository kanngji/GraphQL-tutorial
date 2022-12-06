const express = require("express");
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql").graphqlHTTP;
const { buildSchema } = require("graphql");

const app = express();

// request.body에 있는 데이터에 접근하기위해서 사용
app.use(bodyParser.json());

app.use(
  "/graphql",
  graphqlHttp({
    schema: buildSchema(`
      type RootQuery {
        events: [String!]!
      }

      type RootMutation {
        createEvent(name: String): String

      }
      schema {
        query: RootQuery 
        mutation: RootMutation
      }
    `),
    rootValue: {
      events: () => {
        return ["Romantic Cooking", "Sailing", "All-Night Coding"];
      },
      createEvent: (args) => {
        const eventName = args.name;
        return eventName;
      },
    },
    graphiql: true,
  })
);

app.listen(3000);
