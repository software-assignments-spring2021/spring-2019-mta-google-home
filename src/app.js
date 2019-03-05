import express from "express";
import { urlencoded, json } from "body-parser";
import http from "http";

let app = express();

const PORT = process.env.PORT || 5000;
const KEY = "c5881ea19e9d80654a41b10353585ef0";

app.use(urlencoded({ extended: true }));
app.use(json());

app.get("/", (req, res) => {
  res.send(`Hello world, from port ${PORT}`);
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
  const req = http.request(`http://datamine.mta.info/mta_esi.php?key=${KEY}&feed_id=1`, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    res.on('data', (chunk) => {
      console.log(`BODY: ${chunk}`);
    });
  });
  req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
  });
  req.end();
});
