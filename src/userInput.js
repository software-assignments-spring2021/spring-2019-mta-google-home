class UserInput {
    constructor(station, trainType, direction, numTrains) {
        this.station = station;
        this.trainType = trainType;
        this.direction = direction;
        this.numTrains = numTrains;

        const currentTime = 1000; // Should set current Time 
        this.time = currentTime;
    }
}

module.exports = {
    UserInput
};