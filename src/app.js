import express from "express";
import { urlencoded, json } from "body-parser";
let app = express();

const port = process.env.PORT || 5000;

app.use(urlencoded({ extended: true }));
app.use(json());

app.listen(port, function() {
  console.log(`Server started on port ${port}`);
});
