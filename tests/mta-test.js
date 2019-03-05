import { equal } from 'assert';
import UserInput from '../src/UserInput.js';

describe('UserInput tests', function() {
  it('UserInput has correct station', function(){
    var testInput = new UserInput("Astor Place", "6", "Uptown", 1);
    equal(testInput.station, "Astor Place");
  });

  it('UserInput has Arrival Time ', function(){
    var testInput = new UserInput("Astor Place", "6", "Uptown", 1);
    equal(testInput.time, 1000);
  });


});
