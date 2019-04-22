/*
  App entry point for parsing MTA requests and handling google actions sdk. 
*/

// Import the appropriate service and chosen wrappers
import { dialogflow, Image } from "actions-on-google";
import * as MTAFunc from "./mta";
import express from "express";
import bodyParser from "body-parser";

// Create an app instance
const app = dialogflow();
const expressApp = express().use(bodyParser.json());

// Register handlers for Dialogflow intents
app.intent("Default Welcome Intent", conv => {
  conv.ask("Hi, how is it going?");
  conv.ask(`Here's a picture of a cat`);
  conv.ask(
    new Image({
      url:
        "https://developers.google.com/web/fundamentals/accessibility/semantics-builtin/imgs/160204193356-01-cat-500.jpg",
      alt: "A cat"
    })
  );
});

// Intent in Dialogflow called `Goodbye`
app.intent("Goodbye", conv => {
  conv.close("See you later!");
});

app.intent("Default Fallback Intent", conv => {
  conv.ask(`I didn't understand. Can you tell me something else?`);
});

app.fallback(conv => {
  conv.ask("Welcome! Say a number.");
});

// todo test train time intent
app.intent("LookingForTrainTime", async (conv, params) => {
  const lineType = params.LineType.charAt(0);
  const directionType = params.DirectionType;
  const num = 3;
  const stationName = "42nd street";
  const timeList = await MTAFunc.parseThenGetTimeList(
    lineType,
    stationName,
    directionType,
    num
  );

  console.log(timeList);

  conv.close(
    `The next ${lineType} train going towards ${directionType} is at ${timeList[0]}`
  );
});

expressApp.post("/fulfillment", app);

expressApp.get("/", (req, res) => {
  res.send("Hello!");
});

// console.log(
//   `TRAIN ${trainType}, NEXT ${num} TRAINS, STOP ${stationName}, DIRECTION: ${direction}: `
// );

// MTAFunc.parseThenGetTimeList(trainType, stationName, direction, num);

// To start, run ngrok http 3000 after yarn start
console.log("Listening on port 3000");
expressApp.listen(3000).on("error", function(err){
  console.log(err+ "The app didn't start.")
})
