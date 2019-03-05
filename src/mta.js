const generalTransitFeed = require('gtfs-realtime-bindings');
const request = require('request');

/**
 * As of right now, only supports 1,2,3,4,5,6,GS,5x,6x
 * Returns times in UNIX time
 * @param {string} trainType 
 * @returns {array} timeArray -- returns array with an array of JSON objects. JSON objects contain time in UNIX timestamp
 * @author Daniel Yoo (github: DanielY-Yoo)
 */

const KEY = "c5881ea19e9d80654a41b10353585ef0";

const dataFeeds = {
  '1': `http://datamine.mta.info/mta_esi.php?key=${KEY}&feed_id=1`,
  '2': `http://datamine.mta.info/mta_esi.php?key=${KEY}&feed_id=1`,
  '3': `http://datamine.mta.info/mta_esi.php?key=${KEY}&feed_id=1`,
  '4': `http://datamine.mta.info/mta_esi.php?key=${KEY}&feed_id=1`,
  '5': `http://datamine.mta.info/mta_esi.php?key=${KEY}&feed_id=1`,
  '6': `http://datamine.mta.info/mta_esi.php?key=${KEY}&feed_id=1`,
  'S': `http://datamine.mta.info/mta_esi.php?key=${KEY}&feed_id=1`,
  'A': `http://datamine.mta.info/mta_esi.php?key=${KEY}&feed_id=26`,
  'C': `http://datamine.mta.info/mta_esi.php?key=${KEY}&feed_id=26`,
  'E': `http://datamine.mta.info/mta_esi.php?key=${KEY}&feed_id=26`,
  'S': `http://datamine.mta.info/mta_esi.php?key=${KEY}&feed_id=26`,
  'N': `http://datamine.mta.info/mta_esi.php?key=${KEY}&feed_id=16`,
  'Q': `http://datamine.mta.info/mta_esi.php?key=${KEY}&feed_id=16`,
  'R': `http://datamine.mta.info/mta_esi.php?key=${KEY}&feed_id=16`,
  'W': `http://datamine.mta.info/mta_esi.php?key=${KEY}&feed_id=16`,
  'B': `http://datamine.mta.info/mta_esi.php?key=${KEY}&feed_id=21`,
  'D': `http://datamine.mta.info/mta_esi.php?key=${KEY}&feed_id=21`,
  'F': `http://datamine.mta.info/mta_esi.php?key=${KEY}&feed_id=21`,
  'M': `http://datamine.mta.info/mta_esi.php?key=${KEY}&feed_id=21`,
  'L': `http://datamine.mta.info/mta_esi.php?key=${KEY}&feed_id=2`,
  'G': `http://datamine.mta.info/mta_esi.php?key=${KEY}&feed_id=31`,
  'J': `http://datamine.mta.info/mta_esi.php?key=${KEY}&feed_id=36`,
  'Z': `http://datamine.mta.info/mta_esi.php?key=${KEY}&feed_id=36`,
  '7': `http://datamine.mta.info/mta_esi.php?key=${KEY}&feed_id=51`,
}

function getArrivalTimeList(trainType) {

    const requestSettings = {
        method: 'GET',
        url: dataFeeds[trainType],
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

getArrivalTimeList('6').then((timeArray) => {
    console.log(timeArray[0]);
});
getArrivalTimeList('C').then((timeArray) => {
    console.log(timeArray[0]);
});
getArrivalTimeList('J').then((timeArray) => {
    console.log(timeArray[0]);
});