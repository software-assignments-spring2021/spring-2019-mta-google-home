const express = require("express");
const { urlencoded, json } = require("body-parser");
let app = express();

const PORT = process.env.PORT || 5000;

app.use(urlencoded({ extended: true }));
app.use(json());

app.get("/", (req, res) => {
  res.send(`Hello world, from port ${PORT}`);
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
