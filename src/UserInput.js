class UserInput {
  /**
   * Making the UserInput class using SingleTon method because there should be only one instance of UserInput per session.
   * @param {string} station
   * @param {string} trainType
   * @param {string} direction
   * @param {number} numTrains
   * @param {time} time
   */
  constructor(station, trainType, direction, numTrains = 1, time = null) {
    if (!UserInput.instance) {
      this.station = station;
      this.trainType = trainType;
      this.direction = direction;
      this.numTrains = numTrains;

      if (!time) {
        time = new Date().getTime(); // Should set to current time
      }

      this.time = time;

      UserInput.instance = this;
    }

    return UserInput.instance;
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

const instance = new UserInput();
Object.freeze(instance);

export default instance;
