class Response {
  /**
   *
   * @param {string} arrivalTime
   * @param {string} direction
   * @param {string} station
   * @param {string} trainType
   * @param {number} numTrains
   * @param {time} time
   */

  constructor(arrivalTime, direction, station, trainType, numTrains, time) {
    this.arrivalTime = arrivalTime;
    this.direction = direction;
    this.station = station;
    this.trainType = trainType;
    this.numTrains = numTrains;
    this.time = time;
  }
}

export default Response;
