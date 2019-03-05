import {
  equal
} from 'assert';
import UserInput from '../src/UserInput.js';

describe('UserInput tests', function () {
  it('UserInput has correct station', function () {
    var testInput = new UserInput("Astor Place", "6", "Uptown", 1);
    equal(testInput.station, "Astor Place");
  });

  it('UserInput has Arrival Time ', function () {
    var testInput = new UserInput("Astor Place", "6", "Uptown", 1);
    equal(testInput.time, 1000);
  });

  it('UserInput sets correct line', function () {
    const testInput = new UserInput("Union Square", "N", "Uptown", 1);
    equal(testInput.checkTrainType(), true);
  });

  it('UserInput line checks for cases', function () {
    const testInput = new UserInput("Union Square", "n", "Uptown", 1);
    equal(testInput.checkTrainType(), true);
  });

  it('UserInput checkTrainType checks for invalid lines', function () {
    const testInput = new UserInput("Union Square", "X", "Uptown", 1);
    equal(testInput.checkTrainType(), false);
  });
});