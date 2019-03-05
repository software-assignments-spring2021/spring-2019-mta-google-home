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
});
