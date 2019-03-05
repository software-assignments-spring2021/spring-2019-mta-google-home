import express from "express";
import { urlencoded, json } from "body-parser";
import http from "http";

let app = express();

const PORT = process.env.PORT || 5000;
const KEY = "c5881ea19e9d80654a41b10353585ef0";

const dataFeeds = {
  '1': `http://datamine.mta.info/mta_esi.php?key=${KEY}&feed_id=1`,
  '2': `http://datamine.mta.info/mta_esi.php?key=${KEY}&feed_id=1`,
  '3': `http://datamine.mta.info/mta_esi.php?key=${KEY}&feed_id=1`,
  '4': `http://datamine.mta.info/mta_esi.php?key=${KEY}&feed_id=1`,
  '5': `http://datamine.mta.info/mta_esi.php?key=${KEY}&feed_id=1`,
  '6': `http://datamine.mta.info/mta_esi.php?key=${KEY}&feed_id=1`,
  'S': `http://datamine.mta.info/mta_esi.php?key=${KEY}&feed_id=1`,
  'A': `http://datamine.mta.info/mta_esi.php?key=${KEY}&feed_id=26`,
  'C': `http://datamine.mta.info/mta_esi.php?key=${KEY}&feed_id=26`,
  'E': `http://datamine.mta.info/mta_esi.php?key=${KEY}&feed_id=26`,
  'S': `http://datamine.mta.info/mta_esi.php?key=${KEY}&feed_id=26`,
  'N': `http://datamine.mta.info/mta_esi.php?key=${KEY}&feed_id=16`,
  'Q': `http://datamine.mta.info/mta_esi.php?key=${KEY}&feed_id=16`,
  'R': `http://datamine.mta.info/mta_esi.php?key=${KEY}&feed_id=16`,
  'W': `http://datamine.mta.info/mta_esi.php?key=${KEY}&feed_id=16`,
  'B': `http://datamine.mta.info/mta_esi.php?key=${KEY}&feed_id=21`,
  'D': `http://datamine.mta.info/mta_esi.php?key=${KEY}&feed_id=21`,
  'F': `http://datamine.mta.info/mta_esi.php?key=${KEY}&feed_id=21`,
  'M': `http://datamine.mta.info/mta_esi.php?key=${KEY}&feed_id=21`,
  'L': `http://datamine.mta.info/mta_esi.php?key=${KEY}&feed_id=2`,
  'G': `http://datamine.mta.info/mta_esi.php?key=${KEY}&feed_id=31`,
  'J': `http://datamine.mta.info/mta_esi.php?key=${KEY}&feed_id=36`,
  'Z': `http://datamine.mta.info/mta_esi.php?key=${KEY}&feed_id=36`,
  '7': `http://datamine.mta.info/mta_esi.php?key=${KEY}&feed_id=51`,
}

app.use(urlencoded({ extended: true }));
app.use(json());

app.get("/", (req, res) => {
  res.send(`Hello world, from port ${PORT}`);
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
  const req = http.request(dataFeeds['A'], (res) => {
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
