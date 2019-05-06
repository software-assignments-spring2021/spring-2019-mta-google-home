const generalTransitFeed = require("gtfs-realtime-bindings-transit");
const request = require("request");

// Info from http://web.mta.info/developers/data/nyct/subway/Stations.csv
const stationInfo = require("./data/stations.json");

const KEY = "c5881ea19e9d80654a41b10353585ef0";

const dataFeeds = {
  "1": `http://datamine.mta.info/mta_esi.php?key=${KEY}&feed_id=1`,
  "2": `http://datamine.mta.info/mta_esi.php?key=${KEY}&feed_id=1`,
  "3": `http://datamine.mta.info/mta_esi.php?key=${KEY}&feed_id=1`,
  "4": `http://datamine.mta.info/mta_esi.php?key=${KEY}&feed_id=1`,
  "5": `http://datamine.mta.info/mta_esi.php?key=${KEY}&feed_id=1`,
  "6": `http://datamine.mta.info/mta_esi.php?key=${KEY}&feed_id=1`,
  GS: `http://datamine.mta.info/mta_esi.php?key=${KEY}&feed_id=1`,
  // 42nd street shuttle
  A: `http://datamine.mta.info/mta_esi.php?key=${KEY}&feed_id=26`,
  a: `http://datamine.mta.info/mta_esi.php?key=${KEY}&feed_id=26`,
  C: `http://datamine.mta.info/mta_esi.php?key=${KEY}&feed_id=26`,
  E: `http://datamine.mta.info/mta_esi.php?key=${KEY}&feed_id=26`,
  H: `http://datamine.mta.info/mta_esi.php?key=${KEY}&feed_id=26`,
  FS: `http://datamine.mta.info/mta_esi.php?key=${KEY}&feed_id=26`,
  // Rockaway Park Shuttle and Franklin Avenue Shuttle
  N: `http://datamine.mta.info/mta_esi.php?key=${KEY}&feed_id=16`,
  Q: `http://datamine.mta.info/mta_esi.php?key=${KEY}&feed_id=16`,
  R: `http://datamine.mta.info/mta_esi.php?key=${KEY}&feed_id=16`,
  W: `http://datamine.mta.info/mta_esi.php?key=${KEY}&feed_id=16`,
  B: `http://datamine.mta.info/mta_esi.php?key=${KEY}&feed_id=21`,
  D: `http://datamine.mta.info/mta_esi.php?key=${KEY}&feed_id=21`,
  F: `http://datamine.mta.info/mta_esi.php?key=${KEY}&feed_id=21`,
  M: `http://datamine.mta.info/mta_esi.php?key=${KEY}&feed_id=21`,
  L: `http://datamine.mta.info/mta_esi.php?key=${KEY}&feed_id=2`,
  G: `http://datamine.mta.info/mta_esi.php?key=${KEY}&feed_id=31`,
  J: `http://datamine.mta.info/mta_esi.php?key=${KEY}&feed_id=36`,
  Z: `http://datamine.mta.info/mta_esi.php?key=${KEY}&feed_id=36`,
  "7": `http://datamine.mta.info/mta_esi.php?key=${KEY}&feed_id=51`
};
// var trainType = process.argv[2];
// var num = process.argv[3];
// var station = process.argv[4];

// const trainType = "N";
// const num = 3;
// const stationName = "42nd street";
// const direction = "Uptown";

// const trainType = "A";
// const num = 3;
// const stationName = "42nd street";
// const direction = "Uptown";

/**
 * Gets the next arrival time list of a certain line for the next specified
 * number of trains. Gives back indeterminate length of array if amount is not
 * specified.
 *
 * @param {string} trainType - Specifies which line to get information of
 * ex) A,B,C,5,6,7...
 * @param {number} amount - number of trains that you want information for.
 * ex) specifying 3 will give back next 3 arrival time.
 * @param {string} stationID - specifies which station the line starts from.
 *
 * @returns {array} of objects with the next {amount}, {trainType} trains
 */

export function getArrivalTimeList(trainType, amount, stationId) {
  const requestSettings = {
    method: "GET",
    url: dataFeeds[trainType] || "", // Defaulting url variable to empty in case line is not found
    encoding: null
  };

  return new Promise((resolve, reject) => {
    request(requestSettings, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        const result = [];

        const feed = generalTransitFeed.transit_realtime.FeedMessage.decode(
          body
        );

        feed.entity.forEach(function(entity, index) {
          if (entity.tripUpdate) {
            const routeID = entity.tripUpdate.trip.routeId;

            /**
             * This bit of code here will make sure that the code accounts for
             * express/directional trainTypes.
             *
             * For example, if trainType equals 6, then it will also pull 6X
             * for express track. In the case of S lines, it will account for
             * GS, and FS lines
             */
            if (routeID.indexOf(trainType) > -1) {
              if (entity.tripUpdate.stopTimeUpdate) {
                entity.tripUpdate.stopTimeUpdate.forEach(function(
                  update,
                  index
                ) {
                  // console.log(update.stopId);
                  if (update.stopId === stationId) {
                    result.push(update);
                  }
                });
              }
            }
          }
        });

        const resultKeys = Object.keys(result);
        const resultValues = Object.values(result);
        const timeArray = [];

        for (let i = 0; i < resultKeys.length; i += 1) {
          const resultValueKeys = Object.keys(resultValues[i]);
          const resultValueValues = Object.values(resultValues[i]);

          for (let j = 0; j < resultValueKeys.length; j += 1) {
            if (amount < 1) {
              break;
            }

            if (resultValueValues[j].time) {
              let date = new Date(resultValueValues[j].time * 1000);
              date = formatTime(date);
              /*
              // Hours part from the timestamp
              const hours = date.getHours();
              // Minutes part from the timestamp
              const minutes = "0" + date.getMinutes();
              // Seconds part from the timestamp
              const seconds = "0" + date.getSeconds();

              // Will display time in 10:30:23 format
              const formattedTime =
                hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
                */

              timeArray.push(date);
              amount--;
            }
          }
        }
        resolve(timeArray);
      } else {
        reject(new Error(error));
        // console.log("ERROR");
      }
    });
  });
}
function formatTime(date) {
  var currentTime = date;
  var hours = currentTime.getHours();

  var suffix = "";
  if (hours > 11) {
    suffix += "PM";
  } else {
    suffix += "AM";
  }
  var minutes = currentTime.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (hours > 12) {
    hours -= 12;
  } else if (hours === 0) {
    hours = 12;
  }
  var time = hours + ":" + minutes + " " + suffix;
  return time;
}
/**
 * Takes three parameters, trainType, stationName, direction, then returns
 * the appropriate stationID for getArrivalTimeList function.
 *
 * @param {string} trainType - Specifies which line to get information of
 * ex) A,B,C,5,6,7...
 * @param {string} stationName - name of the station that line should start from
 * @param {string} direction - specifies which direction the train should be
 * going to. Accepts: Downtown/Uptown, Brooklyn/Manhattan, Queens/Manhattan,
 * Bronx/Manhattan
 *
 * @returns {string} stationID
 */
export function getStationObject(trainType, stationName) {
  return new Promise((resolve, reject) => {
    let error = "";
    if (!trainType || !stationName) {
      error = "Please specify a correct train type or station name";
    }

    const stationList = [];

    stationName = parseStationName(stationName.toUpperCase());
    // console.log(stationName);

    for (let i = 0; i < stationInfo.length; i += 1) {
      const stationInfoObject = stationInfo[i];

      if (
        stationInfoObject["Stop Name"].toUpperCase().indexOf(stationName) > -1
      ) {
        stationList.push(stationInfoObject);
      }
    }

    let result = {};

    for (let i = 0; i < stationList.length; i += 1) {
      const stationInfoObject = stationList[i];

      if (Number.isInteger(stationInfoObject["Daytime Routes"])) {
        stationInfoObject["Daytime Routes"] = stationInfoObject[
          "Daytime Routes"
        ].toString();
      }

      const lineList = stationInfoObject["Daytime Routes"].split(" ");
      const lineIndex = lineList.indexOf(trainType);

      if (lineIndex > -1) {
        result = { ...stationInfoObject };
      }
    }

    if (error) {
      reject(new Error(error));
    }

    resolve(result);
  });

  function parseStationName(stationName) {
    // src = https://pe.usps.com/text/pub28/28apc_002.htm
    const aliasList = require("./data/stationAlias.json");

    const aliasKeys = Object.keys(aliasList);
    const aliasValues = Object.values(aliasList);
    const stationNameArray = stationName.split(" ");

    for (let i = 0; i < stationNameArray.length; i += 1) {
      const nameFragment = stationNameArray[i];

      if (hasNumber(nameFragment)) {
        stationNameArray[i] = nameFragment.match(/(\d+|[^\d]+)/g)[0];
      }

      const aliasKeyIndex = aliasKeys.indexOf(nameFragment);
      if (aliasKeyIndex > -1) {
        stationNameArray[i] = aliasValues[aliasKeyIndex];
      }
    }

    return stationNameArray.join(" ");

    function hasNumber(string) {
      return /\d/.test(string);
    }
  }
}

export function getStationID(stationObject, direction) {
  return new Promise((resolve, reject) => {
    let finalStationID = stationObject["GTFS Stop ID"];

    const directionsList = require("./data/directions.json");
    const directionKeys = Object.keys(directionsList);
    if (directionKeys.indexOf(direction) > -1) {
      finalStationID += directionsList[direction];
    } else {
      if (direction.toUpperCase() === "MANHATTAN") {
        const borough = stationObject.Borough;

        if (borough === "Bk") {
          finalStationID += "N";
        } else {
          finalStationID += "S";
        }
      } else {
        reject(new Error("Unknown Direction Type"));
      }
    }

    resolve(finalStationID);
  });
}

// STOP 602S
// console.log(
//   `TRAIN ${trainType}, NEXT ${num} TRAINS, STOP ${stationName}, DIRECTION: ${direction}: `
// );

// parseThenGetTimeList(trainType, stationName, direction, num);

export async function parseThenGetTimeList(
  trainType,
  stationName,
  direction,
  num
) {
  const stationObject = await getStationObject(trainType, stationName);

  // console.log(stationObject);

  const stationID = await getStationID(stationObject, direction);

  const timeList = await getArrivalTimeList(trainType, num, stationID);

  // console.log(timeList);

  return timeList;
}

// getStationObject(trainType, stationName, direction).then(stationObject => {
//   getArrivalTimeList(trainType, num, stationID).then(timeArray => {
//     // TODO: Let the user know what kind of trains are available
//     console.log(timeArray);
//   });
// });
