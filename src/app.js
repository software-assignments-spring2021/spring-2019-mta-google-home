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

const accountSid = "ACf127054ff215ddedaecf74acf2608952";
const authToken = "8e01241892348b33ef95177c136ff7c8";
const client = require("twilio")(accountSid, authToken);

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

app.intent("LookingForTrainTime", async (conv, params) => {
  const lineType = params.LineType.charAt(0).toUpperCase();
  const directionType = params.DirectionType;
  let num = parseInt(params.NumTrains) || 1;
  num = num > 3 ? 3 : num;
  const stationName = params.StationType;
  const timeList = await MTAFunc.parseThenGetTimeList(
    lineType,
    stationName,
    directionType,
    num * 2 + 1
  );

  /*
    For some reason, timelist returns two of the same times, leading to redundancy.
    To work around this, num has been multiplied to allow the true list to be accessed.
    This means that timeList[2] is actually timeList[1], timeList[4] is timeList[2] etc.
  */
  console.log(timeList);
  console.log(num);

  if (num === 1) {
    client.messages
      .create({
        body: `The next ${lineType} train going ${directionType} at ${stationName} will arrive at ${
          timeList[0]
        }`,
        from: "+19735471246",
        to: "+19175834809"
      })
      .then(message => console.log(message.sid));
    conv.close(
      `The next ${lineType} train going ${directionType} at ${stationName} will arrive at ${
        timeList[0]
      }`
    );
  } else if (num === 2) {
    client.messages
      .create({
        body: `The next ${num} ${lineType} trains going ${directionType} at ${stationName} will arrive at ${
          timeList[0]
        }, and ${timeList[2]}`,
        from: "+19735471246",
        to: "+19175834809"
      })
      .then(message => console.log(message.sid));
    conv.close(
      `The next ${num} ${lineType} trains going ${directionType} at ${stationName} will arrive at ${
        timeList[0]
      }, and ${timeList[2]}`
    );
  } else {
    client.messages
      .create({
        body: `The next ${num} ${lineType} trains going ${directionType} at ${stationName} will arrive at ${
          timeList[0]
        }, ${timeList[2]}, and ${timeList[4]}`,
        from: "+19735471246",
        to: "+19175834809"
      })
      .then(message => console.log(message.sid));
    conv.close(
      `The next ${num} ${lineType} trains going ${directionType} at ${stationName} will arrive at ${
        timeList[0]
      }, ${timeList[2]}, and ${timeList[4]}`
    );
  }
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
expressApp.listen(3000).on("error", function(err) {
  console.log(err + "The app didn't start.");
});
