class Response {
    constructor(arrivalTime, direction, station, trainType, numTrains, time) {
        this.arrivalTime = arrivalTime;
        this.direction = direction;
        this.station = station;
        this.trainType = trainType;
        this.numTrains = numTrains;
        this.time = time;
    }
}

module.exports = {
    Response
}