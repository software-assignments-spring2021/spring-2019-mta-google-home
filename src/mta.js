const generalTransitFeed = require('gtfs-realtime-bindings');
const request = require('request');

/**
 * As of right now, only supports 1,2,3,4,5,6,GS,5x,6x
 * Returns times in UNIX time
 * @param {string} trainType 
 * @returns {array} timeArray -- returns array with an array of JSON objects. JSON objects contain time in UNIX timestamp
 * @author Daniel Yoo (github: DanielY-Yoo)
 */
function getTrainInfo(trainType) {

    const requestSettings = {
        method: 'GET',
        url: 'http://datamine.mta.info/mta_esi.php?key=4a9f2f0d04ff986286f7739acb65054d&feed_id=1',
        encoding: null
    };

    return new Promise((resolve, reject) => {
        request(requestSettings, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                // console.log(body);

                // const feed = generalTransitFeed.TripUpdate.decode(body);
                // console.log(feed);
                const result = [];

                const feed = generalTransitFeed.FeedMessage.decode(body);
                // console.log(feed.entity[0].trip_update.trip.trip_id);
                feed.entity.forEach(function (entity) {
                    if (entity.trip_update) {
                        const routeID = entity.trip_update.trip.route_id;
                        // console.log(typeof (routeID));
                        // console.log(trainType);
                        if (routeID === trainType) {
                            result.push(entity.trip_update.stop_time_update);
                        }
                    }
                });

                // console.log(result);
                const resultKeys = Object.keys(result);
                const resultValues = Object.values(result);
                const timeArray = [];

                for (let i = 0; i < resultKeys.length; i += 1) {
                    const resultValueKeys = Object.keys(resultValues[i]);
                    const resultValueValues = Object.values(resultValues[i]);

                    for (let j = 0; j < resultValueKeys.length; j += 1) {
                        if (resultValueValues[j].arrival) {
                            timeArray.push(resultValueValues[j].arrival.time);
                        }

                    }
                }

                resolve(timeArray);
            } else {
                console.log(error);
                reject(new Error(error));
            }
        });
    });
}

getTrainInfo("6").then((timeArray) => {
    console.log(timeArray);
});