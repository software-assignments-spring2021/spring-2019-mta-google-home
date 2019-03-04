class UserInput {
    constructor(station, trainType, direction, numTrains = 1, time = null) {
        this.station = station;
        this.trainType = trainType;
        this.direction = direction;
        this.numTrains = numTrains;

        if (!time) {
            time = 1000; // Should set to current time
        }

        this.time = time;
    }
}

module.exports = {
    UserInput
};