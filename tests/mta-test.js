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