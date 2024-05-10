const { nextISSTimesForMyLocation } = require('./iss_promised');

const printPassTimes = function(flyover) {
  for (const pass of flyover) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation()
  .then((passes) => {
    printPassTimes(passes);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });