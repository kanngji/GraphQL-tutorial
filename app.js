const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// request.body에 있는 데이터에 접근하기위해서 사용
app.use(bodyParser.json());

app.get("/", (req, res, next) => {
  res.send("Hello World");
});

app.listen(3000);
