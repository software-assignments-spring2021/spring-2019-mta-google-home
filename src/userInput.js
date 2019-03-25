class UserInput {
  /**
   *
   * @param {string} station
   * @param {string} trainType
   * @param {string} direction
   * @param {number} numTrains
   * @param {time} time
   */
  constructor(station, trainType, direction, numTrains = 1, time = null) {
    this.station = station;
    this.trainType = trainType;
    this.direction = direction;
    this.numTrains = numTrains;

    if (!time) {
      time = 1000; // Should set to current time
    }
    //test
    this.time = time;
  }

  checkTrainType() {
    const trainType = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "M",
      "J",
      "Z",
      "L",
      "S",
      "N",
      "Q",
      "R",
      "W"
    ];

    return trainType.indexOf(this.trainType.toUpperCase()) > -1;
  }
}

export default UserInput;
