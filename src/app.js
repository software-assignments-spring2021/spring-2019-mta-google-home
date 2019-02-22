const express = require("express");
const bodyParser = require("body-parser");
let app = express();

const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(port, function() {
  console.log(`Server started on port ${port}`);
});
