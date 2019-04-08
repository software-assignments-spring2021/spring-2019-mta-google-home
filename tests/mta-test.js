import { equal } from "assert";
import UserInput from "../src/UserInput.js";
import Response from "../src/Response.js";

describe("UserInput tests", function() {
  it("UserInput has correct station", function() {
    var testInput = new UserInput("Astor Place", "6", "Uptown", 1);
    equal(testInput.station, "Astor Place");
  });

  it("UserInput has Arrival Time ", function() {
    var testInput = new UserInput("Astor Place", "6", "Uptown", 1);
    equal(testInput.time, 1000);
  });

  it("UserInput sets correct line", function() {
    const testInput = new UserInput("Union Square", "N", "Uptown", 1);
    equal(testInput.checkTrainType(), true);
  });

  it("UserInput line checks for cases", function() {
    const testInput = new UserInput("Union Square", "n", "Uptown", 1);
    equal(testInput.checkTrainType(), true);
  });

  it("UserInput checkTrainType checks for invalid lines", function() {
    const testInput = new UserInput("Union Square", "X", "Uptown", 1);
    equal(testInput.checkTrainType(), false);
  });
  it("Should return correct num train1", function() {
    const testInput = new UserInput("Union Square", "X", "Uptown", 1);
    equal(testInput.numTrains, 1);
  });
  it("Should return correct num train1", function() {
    const testInput = new UserInput("Prince Street", "W", "Uptown", 2);
    equal(testInput.numTrains, 2);
  });
  it("Should return correct num train1", function() {
    const testInput = new UserInput("Canal Street", "Q", "Uptown", 3);
    equal(testInput.numTrains, 3);
  });
  it("Should return correct num train1", function() {
    const testInput = new UserInput("Times Square:", "3", "Uptown", 4);
    equal(testInput.numTrains, 4);
  });

  it("should contain a correct direction", () => {
    const validDirections = new Set([
      "Uptown",
      "Downtown",
      "Eastbound",
      "Westbound"
    ]);
    const testInput = new UserInput("Times Square", "3", "Uptown", 4);
    equal(true, validDirections.has(testInput.direction));
  });

  it("should reject invalid directions", () => {
    const validDirections = new Set([
      "Uptown",
      "Downtown",
      "Eastbound",
      "Westbound"
    ]);
    const testInput = new UserInput("Times Square", "3", "Around Town", 4);
    equal(false, validDirections.has(testInput.direction));
  });
});

describe("Response tests", function() {
  it("should contain a correct direction", () => {
    const validDirections = new Set([
      "Uptown",
      "Downtown",
      "Eastbound",
      "Westbound"
    ]);
    let testInput = new Response(
      "00:02:05",
      "Uptown",
      "8th Street NYU",
      "1",
      "1",
      "Local"
    );
    equal(true, validDirections.has(testInput.direction));
  });

  it("should reject invalid directions", () => {
    const validDirections = new Set([
      "Uptown",
      "Downtown",
      "Eastbound",
      "Westbound"
    ]);
    let testInput = new Response(
      "00:02:05",
      "Around Town",
      "8th Street NYU",
      "1",
      "1",
      "Local"
    );
    equal(false, validDirections.has(testInput.direction));
  });
});

// describe("Get Station Tests", function() {
//   it("Should give back right station", () => {
//     const correctObject = {
//       "Station ID": 163,
//       "Complex ID": 611,
//       "GTFS Stop ID": "A27",
//       Division: "IND",
//       Line: "8th Ave - Fulton St",
//       "Stop Name": "42 St - Port Authority Bus Terminal",
//       Borough: "M",
//       "Daytime Routes": "A C E",
//       Structure: "Subway",
//       "GTFS Latitude": 40.757308,
//       "GTFS Longitude": -73.989735
//     };

//     const comparedObject = getStationObject("A", "42nd Street");

//     equal(correctObject, comparedObject);
//   });
// });
